// Genera la "Radiografía Operativa VÉRTICE": un diagnóstico inicial estructurado
// a partir de la transcripción de la conversación con el consultor. Se llama una
// sola vez al terminar la conversación y su resultado se muestra en el widget y
// viaja con el lead — la llamada comercial arranca con el diagnóstico ya hecho.

const MODEL = 'claude-sonnet-5';
const MAX_TOKENS = 1400;
const MAX_MESSAGES = 21;
const MAX_CONTENT_LEN = 1200;
const MIN_USER_TURNS = 3;

const ALLOWED_ORIGINS = [
  'https://vertice-studio-mu.vercel.app',
  'https://vertice-studio-jpelaezcolibris-projects.vercel.app',
];
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/vertice-studio-[a-z0-9]+-jpelaezcolibris-projects\.vercel\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

// Una radiografía por conversación: límite más estricto que el del chat.
const RL_WINDOW_MS = 60_000;
const RL_MAX_PER_WINDOW = 3;
const rlHits = new Map();

function rateLimitOk(req) {
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  const now = Date.now();
  if (rlHits.size > 5000) rlHits.clear();
  const rec = rlHits.get(ip) || { count: 0, start: now };
  if (now - rec.start > RL_WINDOW_MS) {
    rec.count = 0;
    rec.start = now;
  }
  rec.count += 1;
  rlHits.set(ip, rec);
  return rec.count <= RL_MAX_PER_WINDOW;
}

function corsCheck(req) {
  const raw = req.headers.origin || req.headers.referer || '';
  if (!raw) return false;
  let origin;
  try {
    origin = new URL(raw).origin;
  } catch {
    return false;
  }
  return (
    ALLOWED_ORIGINS.includes(origin) ||
    ALLOWED_ORIGIN_PATTERNS.some((p) => p.test(origin))
  );
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return false;
  const ok = messages.every(
    (m) =>
      m &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.length > 0 &&
      m.content.length <= MAX_CONTENT_LEN
  );
  if (!ok) return false;
  // Sin suficiente conversación no hay diagnóstico honesto que generar.
  return messages.filter((m) => m.role === 'user').length >= MIN_USER_TURNS;
}

const SYSTEM_PROMPT = `Eres el analista senior de Vértice Studio (estudio de sistemas inteligentes para negocios, Medellín, Colombia). Recibirás la transcripción de una conversación de diagnóstico entre el consultor de Vértice y el dueño de un negocio. Tu trabajo: generar la "Radiografía Operativa VÉRTICE", un diagnóstico inicial breve, honesto y accionable.

REGLAS
- Usa ÚNICAMENTE lo que el visitante dijo en la transcripción. No inventes datos, cifras, canales ni problemas que no mencionó.
- Si falta información para una sección, escribe exactamente: "Por confirmar en la sesión de diagnóstico".
- En "impacto_estimado" solo usa números que el visitante dio (mensajes/día, horas, clientes perdidos). Si no dio cifras, describe el impacto de forma cualitativa y prudente, sin porcentajes inventados.
- En "hoja_de_ruta" prioriza de 2 a 4 oportunidades por impacto. Cada una: qué problema ataca y qué mejora esperar. No nombres tecnologías por moda ni uses jerga ("CRM", "funnel"); describe lo que el sistema haría en lenguaje de negocio.
- Español de Colombia, frases cortas, sin emojis, tono de consultor senior: cercano, analítico, sin exagerar.
- Evita palabras vacías: "disruptivo", "innovador", "sinergia", "revolucionario".

FORMATO
Responde ÚNICAMENTE con un objeto JSON válido, sin markdown, sin backticks y sin texto fuera del JSON, con esta estructura exacta:
{
  "negocio": "una línea: a qué se dedica el negocio",
  "captacion": "cómo llegan hoy los clientes (canales y flujo)",
  "cuellos_de_botella": ["punto 1", "punto 2"],
  "procesos_manuales": ["proceso 1", "proceso 2"],
  "fugas": ["dónde se están perdiendo oportunidades o información"],
  "impacto_estimado": "estimación del costo en tiempo y ventas de no hacer nada",
  "hoja_de_ruta": [
    { "prioridad": 1, "accion": "qué haríamos primero y por qué", "impacto": "mejora esperada" }
  ]
}`;

function parseRadiografia(text) {
  if (!text) return null;
  // El prompt pide JSON puro, pero por si el modelo envuelve en ```json ... ```
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  try {
    const obj = JSON.parse(cleaned);
    return obj && typeof obj === 'object' ? obj : null;
  } catch {
    return null;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }
  if (!corsCheck(req)) {
    res.status(403).json({ error: 'forbidden' });
    return;
  }
  if (!rateLimitOk(req)) {
    res.status(429).json({ error: 'rate_limited' });
    return;
  }

  const { messages } = req.body || {};
  if (!validateMessages(messages)) {
    res.status(400).json({ error: 'invalid_messages' });
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(503).json({ error: 'ai_not_configured' });
    return;
  }

  const transcript = messages
    .map((m) => (m.role === 'user' ? 'Visitante: ' : 'Consultor: ') + m.content)
    .join('\n');

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        thinking: { type: 'disabled' },
        system: [{ type: 'text', text: SYSTEM_PROMPT }],
        messages: [
          {
            role: 'user',
            content: 'Transcripción de la conversación de diagnóstico:\n\n' + transcript,
          },
        ],
      }),
    });
    const data = await anthropicRes.json();
    if (!anthropicRes.ok) {
      res.status(502).json({ error: data.error?.message || 'anthropic_error' });
      return;
    }
    const u = data.usage || {};
    console.log(
      '[radiografia_usage]',
      JSON.stringify({ in: u.input_tokens, out: u.output_tokens })
    );
    const textBlock = Array.isArray(data.content)
      ? data.content.find((b) => b.type === 'text' && b.text)
      : null;
    const radiografia = parseRadiografia(textBlock?.text?.trim());
    if (!radiografia) {
      res.status(502).json({ error: 'radiografia_parse_error' });
      return;
    }
    res.status(200).json({ radiografia });
  } catch (err) {
    res.status(502).json({ error: 'anthropic_unreachable' });
  }
};
