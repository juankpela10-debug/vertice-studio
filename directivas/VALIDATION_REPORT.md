# Informe de Validación — Vértice Studio

> Julio 2026 · Auditoría del trabajo ya realizado contra el checklist de 3 skills: `brand-identity-lab`, `landing-page-pro`, `ai-agent-builder`.
> No es re-ejecución: es control de calidad. Cada ítem = PASS / PARCIAL / FALTA / N/A, con evidencia y severidad.

---

## Veredicto global

| Área | Puntuación | Estado |
|---|---|---|
| **Marca** (brand-identity-lab) | 5/6 aplicables | 🟢 Sólida — 1 hueco técnico |
| **Landing** (landing-page-pro) | 6/8 | 🟢 Buena — falta prueba social real |
| **Agente** (ai-agent-builder) | 4/11 producción | 🟡 Esenciales OK, falta grado producción |

Traducción: **marca y landing están bien; el agente cumple lo crítico (seguridad, fallback, prompt en git) pero le falta la capa "producción seria" (eval, caching, observabilidad)** que la skill exige para escalar. Nada de eso es urgente para un agente de captación con tope de 4 turnos, pero es lo que lo separa de "juguete" a "sistema medible".

---

## 1. Marca — checklist `brand-identity-lab`

| Ítem | Estado | Evidencia |
|---|---|---|
| Statement de posicionamiento en una frase | 🟢 PASS | BRAND.md §1: "Para dueños de negocio en LATAM que venden bien pero se ven mal en digital, Vértice es el estudio... lo pruebas en vivo." |
| 12 nombres con check dominio/legal | ⚪ N/A | Marca existente, no se renombra. La skill es para naming nuevo; no aplica. |
| Paleta con contraste WCAG AA verificado | 🟢 PASS | BRAND.md §4: ratios calculados (ink 17.9:1 AAA; gold-700 4.6:1 AA; reglas de uso del dorado). |
| Máximo 2 familias tipográficas con licencia | 🟢 PASS | Playfair Display + DM Sans (Google Fonts, licencia OFL). |
| Tokens CSS exportables y reutilizables | 🟡 **PARCIAL** | Definidos en BRAND.md §6, **pero NO están en el `:root` de index.html**: faltan `--gold-300`, `--gold-700`, `--ok`, `--warn`, `--err`. El brandbook promete tokens que el código no tiene. → **Hueco #1**. |
| Brandbook en Markdown versionable | 🟢 PASS | directivas/BRAND.md, commiteado. |
| Ejemplos correcto/incorrecto | 🟡 PARCIAL | Hay reglas "sí/no" en texto (§3 vocabulario, §4 reglas del dorado, §5 usos del logo), pero no ejemplos **visuales**. Aceptable para un sitio de un solo dueño. |

**Severidad:** solo el hueco de tokens vale la pena cerrar (5 min, cero riesgo visual: son variables aditivas). El resto es cosmético o N/A.

---

## 2. Landing — checklist `landing-page-pro`

| Ítem | Estado | Evidencia |
|---|---|---|
| Headline promete transformación concreta | 🟢 PASS | "Páginas y sistemas que venden." + hero con dolor ("Tu negocio ya vende. Tu presencia digital debería vender más."). |
| CTA repetido mínimo 3 veces | 🟢 PASS | 5+ instancias (nav, servicios, cta-final, bottom-nav, WhatsApp). *Matiz CRO: la skill pide "mismo texto"; hoy hay variantes ("Recibir dirección", "...inicial", "...en 24h"). Coherentes en tema, no idénticas.* |
| Testimonio con nombre + cargo + foto | 🟡 **PARCIAL** | Nombre + cargo sí; **foto NO** (usa iniciales SV/MR/LP). Además siguen siendo textos reescritos, **no citas verbatim reales**. → **Hueco #2** (requiere material de Juan). |
| FAQ resuelve 3 objeciones principales | 🟢 PASS | 8 ítems, incluidas las 2 añadidas ("¿y si ya tengo página?", "¿puedo tener un agente como este?"). |
| Meta tags Open Graph completos | 🟢 PASS | og:* + twitter:* completos, apuntando a dominio Vercel. |
| Responsive 375 / 768 / 1440 | 🟡 PARCIAL | Hay media queries; no testeado en cada breakpoint esta sesión. Recomendado verificar en móvil real. |
| Sin lorem ipsum | 🟢 PASS | Copy real en todo el sitio. |
| Link del CTA apunta a algo | 🟢 PASS | Formulario → /api/lead; agente → captura → /api/lead; WhatsApp directo. |

**Principios CRO adicionales:** prueba social en primeros 500px → el hero muestra el **agente en vivo** (prueba de producto), pero los logos de marcas van después del hero. Above-the-fold: el "CTA" principal above the fold es el input del agente, no un botón clásico — defendible porque el agente ES la conversión.

**Severidad:** el hueco real es la prueba social (fotos + testimonios verbatim + métricas reales). Es lo que más mueve conversión y es lo único que necesita material tuyo.

---

## 3. Agente — checklist pre-producción `ai-agent-builder`

| Ítem | Estado | Evidencia |
|---|---|---|
| System prompt versionado en Git | 🟢 PASS | api/chat.js commiteado. |
| Dataset de eval >20 casos | 🔴 FALTA | No existe. Documentado como backlog en AGENT_VALIDATION.md §5. Sin esto, cada cambio de prompt es a ciegas. |
| Logging completo | 🟡 PARCIAL | lead.js loguea el funnel; chat.js **no loguea tokens/coste/latencia**. |
| Rate limiting | 🟢 PASS | Añadido (8/min chat, 5/min lead), verificado en producción. |
| Input guardrails (injection, PII) | 🟡 PARCIAL | Anti-injection a nivel de prompt ✅; **sin capa dedicada** de detección PII/injection antes del LLM. |
| Output guardrails (safety, formato) | 🔴 FALTA | No hay segundo LLM validador. Baja prioridad para este caso de uso (respuestas cortas, tope 4 turnos). |
| Fallback a humano | 🟢 PASS | Deriva a WhatsApp (+57 301 698 1200) en error y en cierre. |
| Prompt caching | 🔴 FALTA | El system prompt (~1.2k tokens) se reenvía completo cada turno. Caching = **-90% de ese coste**. Cambio de valor real. |
| Monitorización de coste | 🔴 FALTA | No se registran tokens por request. |
| Feedback loop (thumbs up/down) | 🔴 FALTA | La UI del chat no captura si la respuesta sirvió. |
| Plan de eval semanal | 🔴 FALTA | Sin dataset, no hay plan. |

**Severidad realista:** de los 7 huecos, los que valen la pena por costo/beneficio son **prompt caching** (ahorra plata ya) y **logging de tokens** (1 línea, habilita medir). Eval dataset, output guardrails y feedback loop son inversión de "escalar en serio" — legítimos pero no bloqueantes hoy.

Lo esencial (prompt en git, rate limiting, fallback, anti-injection básico, límite de iteraciones) **está**. Este agente es seguro y funcional; le falta el instrumental para mejorarlo con datos.

---

## Plan de cierre de huecos (priorizado)

### Quick wins (yo puedo, seguros, ~15 min)
1. **Hueco #1 — Tokens de marca:** agregar `--gold-300/700`, `--ok/warn/err` al `:root` de index.html para que el código == brandbook. Aditivo, sin cambio visual.
2. **Prompt caching en chat.js:** pasar el system prompt como bloque con `cache_control` → recorta ~90% del coste de tokens de sistema.
3. **Logging de coste:** 1 línea en chat.js registrando `usage.input_tokens/output_tokens` por respuesta.

### Requieren material o decisión de Juan
4. **Testimonios verbatim + fotos** (prueba social — el de mayor impacto en conversión).
5. **GA4** (ID de medición) — sin datos no hay validación real de la landing.
6. **Dataset de eval** — se arma copiando 20 conversaciones reales de los logs de Vercel.
7. **Secreto del Apps Script** (seguridad del lead) — código listo en AGENT_VALIDATION.md §3.

---

### Resumen en una frase
Marca y landing pasan la validación con huecos menores (tokens en código, prueba social real); el agente cumple todo lo **crítico** pero le falta el instrumental de **producción medible** (caching, logging, eval) — de lo cual caching y logging los puedo cerrar ya y el resto necesita tus datos.
