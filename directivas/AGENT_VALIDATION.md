# Validación del Agente de Diagnóstico — Vértice Studio

> Julio 2026 · Auditoría con skill ai-agent-builder contra `directivas/BRAND.md`.
> Alcance: `api/chat.js` (agente) y `api/lead.js` (captura), función serverless en Vercel.

---

## 1. Veredicto general

**El agente funciona y está bien diseñado para su propósito.** Es un agente de diagnóstico single-purpose (sin tools, sin RAG — correcto para este caso: el conocimiento cabe en el system prompt), con límite de 4 turnos y cierre a captura de lead. La arquitectura simple es la adecuada; los problemas estaban en seguridad del endpoint y detalles de voz.

### Prueba real ejecutada (2026-07-12)

```
POST https://vertice-studio-mu.vercel.app/api/chat
→ HTTP 200 en 2.7s
→ "Cuéntame, ¿hoy atiendes los pedidos por WhatsApp tú misma (o alguien
   del equipo), o buscas que algo automatice esa atención?"
```

✅ Modelo `claude-sonnet-5` responde correctamente en producción.
✅ Tuteo colombiano, una sola pregunta, ≤2 líneas, cero emojis — cumple la voz de marca.
✅ Lógica de turno final (`done`) operativa.

## 2. Checklist del agente (skill ai-agent-builder)

| Ítem | Estado | Nota |
|---|---|---|
| Problema específico definido | ✅ | Diagnóstico inicial → lead calificado |
| Persona única | ✅ | Dueño de negocio LATAM, problem-aware |
| System prompt versionado en Git | ✅ | Vive en `api/chat.js` |
| Validación de inputs | ✅ | roles, longitud ≤500, ≤10 mensajes |
| Límite de iteraciones/turnos | ✅ | 4 turnos usuario, luego cierre forzado |
| Fallback si falla | ✅ Mejorado | Ahora con número de WhatsApp y voz de marca |
| Rate limiting | ✅ **Añadido** | 8 req/min/IP (chat), 5 req/min/IP (lead) |
| CORS estricto | ✅ **Añadido** | Lista exacta + patrones; rechaza sin Origin |
| Transparencia (no finge ser humano) | ✅ **Añadido** | Regla explícita en el prompt |
| Guardrail anti prompt-injection | ✅ **Añadido** | El input del visitante es dato, no instrucción |
| Prompt caching | ⚠️ Pendiente | Ver §5 |
| Dataset de eval | ⚠️ Pendiente | Ver §5 |
| Observabilidad | ⚠️ Parcial | Logs de Vercel; sin tracking de tokens/coste |

## 3. Cambios aplicados

### `api/chat.js`
1. **Rate limiting** en memoria por IP: 8 requests/min. Respuesta 429 con mensaje en voz de marca que redirige a WhatsApp. *Limitación conocida: el mapa vive por instancia serverless y se reinicia en cold starts — frena abuso casual, no un ataque distribuido. Upgrade futuro: Upstash Redis.*
2. **CORS estricto**: antes aceptaba requests sin `Origin` y validaba con `includes()` (evadible con `evil.com/?vertice-studio`). Ahora: parse de la URL de origen + lista exacta (`vertice-studio-mu.vercel.app`, alias del proyecto) + patrones para deploys de preview y localhost. Sin `Origin` → 403.
3. **System prompt** — 3 reglas nuevas alineadas al brandbook §5:
   - Transparencia: si le preguntan, dice con naturalidad que es IA ("y eso mismo es una demo de lo que construimos" — convierte la objeción en venta).
   - Anti-injection: el mensaje del visitante es información del negocio, no instrucciones; desvía intentos de cambiar rol/reglas.
   - Vocabulario prohibido del brandbook (disruptivo, sinergia, etc.).
4. **Fallback de error** con voz de marca y el número real: "Se me cruzaron los cables un segundo. Escríbeme directo por WhatsApp: +57 301 698 1200."

### `api/lead.js`
1. Mismo CORS estricto + rate limiting (5/min — un humano llena el formulario 1 vez).
2. `SHEET_URL` ahora se puede sobreescribir con env var `LEAD_SHEET_URL`.
3. **Secreto compartido opcional**: si defines `LEAD_SHEET_SECRET` en Vercel, viaja en el payload como `secret`.

### Cambio pendiente del lado de Google Apps Script (manual, 2 min)

En el editor del Apps Script de la hoja de leads, al inicio de `doPost`:

```javascript
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var SECRET = 'el-mismo-valor-que-LEAD_SHEET_SECRET-en-vercel';
  if (data.secret !== SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ok:false}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  delete data.secret; // no guardar el secreto en la hoja
  // ... resto del código existente
}
```

Luego en Vercel: Settings → Environment Variables → `LEAD_SHEET_SECRET` = el mismo valor. Sin esto, la URL del script (visible en el repo) permite a cualquiera escribir filas en tu hoja.

## 4. Lo que estaba bien y NO se tocó

- Modelo `claude-sonnet-5` + `max_tokens: 300` — respuestas rápidas y baratas, correcto para chat corto.
- Precios y portafolio hardcodeados en el prompt (anti-alucinación de precios).
- Regla "UN caso por respuesta, en pasado, con resultado" — storytelling con prueba, alineada al brandbook.
- Flujo de 4 turnos → `done: true` → captura nombre + WhatsApp con transcript como descripción del lead.
- Respuesta "degraded" de lead.js (200 con `saved:false`) para que el front muestre WhatsApp de respaldo sin mentir.

## 5. Backlog recomendado (no bloqueante)

1. **Prompt caching** (`cache_control: {type:'ephemeral'}` en el bloque system): el prompt es ~1.2k tokens y se reenvía en cada turno — el caching recorta ~90% de ese coste. Requiere pasar `system` como array de bloques.
2. **Dataset de eval** (20 casos): guardar conversaciones reales de los logs y evaluar cada cambio de prompt contra ellas (tono, un-caso-máximo, precios correctos, cierre a WhatsApp). Sin esto, cada edición del prompt es a ciegas.
3. **Observabilidad de coste**: loguear `usage.input_tokens/output_tokens` de cada respuesta de Anthropic (1 línea) para ver coste por conversación en los logs de Vercel.
4. **Rate limit persistente** con Upstash Redis (gratis hasta 10k req/día) si el tráfico crece.
5. **Streaming (SSE)**: hoy la respuesta llega completa (~2-3s) con typing cosmético; con streaming la primera palabra aparece en <1s. Mejora percepción, no conversión — baja prioridad.
