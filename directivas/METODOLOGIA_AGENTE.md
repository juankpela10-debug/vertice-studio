# Directiva: Metodología del Consultor de Diagnóstico (agente IA)

## Objetivo
El agente de IA del hero no es un chatbot de preguntas ni un asistente comercial:
es un **Consultor de Diagnóstico Empresarial** que sigue la metodología oficial
de Vértice Studio. Su trabajo no es vender servicios — es descubrir los problemas
operativos del negocio del visitante y generar el deseo natural de resolverlos.
Solo después presenta a Vértice como la solución.

## Filosofía
No vendemos páginas web, automatizaciones ni IA. Diseñamos sistemas inteligentes
que ayudan a las empresas a vender más, trabajar mejor y crecer de forma organizada.
La tecnología es el medio, nunca el objetivo. El producto real es la transformación
del negocio.

## Las 6 fases (implementadas en `api/chat.js`)

1. **El negocio** — a qué se dedica, cuántas personas trabajan, cómo llegan los
   clientes hoy, qué proceso sigue un cliente desde que pregunta hasta que compra.
2. **El problema** — el cuello de botella real: dónde se pierde tiempo, qué tarea
   se repite, qué depende de una sola persona, qué pasa fuera de horario.
3. **Cuantificar la pérdida** — mensajes al día, cuántos se alcanzan a responder,
   clientes perdidos por semana, horas en tareas repetitivas. Sin exagerar: el
   visitante debe llegar solo a la conclusión.
4. **La visión** — invitar a imaginar el negocio con respuesta inmediata, con
   tiempo liberado, con información organizada.
5. **Presentar Vértice** — solo aquí se explica el método (analizamos → rediseñamos
   procesos → implementamos tecnología). Nunca se empieza por la tecnología.
6. **Invitación** — cierre sin presión, invitando a la sesión de diagnóstico.

El servidor (`phaseHint` en `api/chat.js`) inyecta una guía de fase por turno
("Turno 4 de 10: FASE 2") en un bloque de sistema sin caché, porque el modelo no
cuenta turnos por sí solo. Es una guía, no una camisa de fuerza: el prompt le pide
adaptarse a lo que el visitante ya respondió.

Turnos de usuario permitidos: **10** (`MAX_USER_TURNS` en `api/chat.js`).
Cierre anticipado: si el visitante pide acelerar ("no tengo tiempo", "dime ya"),
el modelo resume y cierra con el marcador `[CIERRE]`, que el servidor retira del
texto antes de mostrarlo y usa para marcar `done: true`.

## Radiografía Operativa VÉRTICE

Al terminar la conversación (mínimo 3 turnos de usuario), `api/radiografia.js`
genera un diagnóstico estructurado a partir de la transcripción:

- Cómo llegan hoy los clientes
- Cuellos de botella
- Procesos manuales
- Dónde se pierden oportunidades
- Impacto estimado en tiempo y ventas
- Hoja de ruta priorizada (2-4 acciones)

Reglas duras del prompt: solo usa lo que el visitante dijo (nunca inventa cifras
ni canales), y si falta un dato escribe "Por confirmar en la sesión de diagnóstico".

Flujo en `index.html`: la radiografía se genera **en segundo plano** apenas
termina la conversación, mientras el visitante ve el formulario de captura
("nombre y WhatsApp para ver tu radiografía"). Al enviar el formulario, se
muestra la tarjeta con el diagnóstico y un resumen de la radiografía viaja junto
al lead a Google Sheets — la llamada comercial arranca con el diagnóstico ya
hecho, no desde cero.

## Objetivo final de percepción
Al terminar, el visitante debe pensar "ahora entiendo cuál es el problema real
de mi empresa" y luego "quiero que Vértice me ayude a resolverlo". Nunca debe
pensar "me quieren vender una página web".
