// Recibe un lead del sitio y lo reenvía a Google Sheets del lado del servidor.
// Server-side no tiene CORS, así que podemos leer la respuesta real y confirmar
// entrega — a diferencia del fetch no-cors del navegador, que fallaba en silencio.

const SHEET_URL =
  process.env.LEAD_SHEET_URL ||
  'https://script.google.com/macros/s/AKfycbwvTAX1zt1VVCdcNddOqY0v2tWwO7AQ4Mu5NEexQNEA6KTwVEqFWuIKvkQxFfChCWOXLg/exec';

const ALLOWED_ORIGINS = [
  'https://vertice-studio-mu.vercel.app',
  'https://vertice-studio-jpelaezcolibris-projects.vercel.app',
];
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/vertice-studio-[a-z0-9]+-jpelaezcolibris-projects\.vercel\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];
const MAX_FIELD = 2000;

const RL_WINDOW_MS = 60_000;
const RL_MAX_PER_WINDOW = 5;
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

function clean(v) {
  return typeof v === 'string' ? v.slice(0, MAX_FIELD) : '';
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

  const b = req.body || {};
  const nombre = clean(b.nombre).trim();
  const telefono = clean(b.telefono).trim();
  if (!nombre || !telefono) {
    res.status(400).json({ error: 'missing_fields' });
    return;
  }

  const payload = {
    fecha: clean(b.fecha) || new Date().toISOString(),
    nombre,
    telefono,
    email: clean(b.email),
    negocio: clean(b.negocio),
    tipo: clean(b.tipo),
    presupuesto: clean(b.presupuesto),
    descripcion: clean(b.descripcion),
    origen: clean(b.origen) || 'desconocido',
  };

  // Secreto compartido con el Apps Script: si LEAD_SHEET_SECRET está definido
  // en Vercel, viaja en el payload y el script debe validarlo antes de escribir.
  // (Ver directivas/AGENT_VALIDATION.md para el cambio del lado de Apps Script.)
  if (process.env.LEAD_SHEET_SECRET) {
    payload.secret = process.env.LEAD_SHEET_SECRET;
  }

  // Funnel visibility — visible en los logs de la función en Vercel.
  console.log('[lead_capturado]', JSON.stringify({ origen: payload.origen, negocio: payload.negocio }));

  try {
    const sheetRes = await fetch(SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (sheetRes.status >= 400) {
      // No pudimos guardar en Sheets — respondemos "degraded" para que el
      // navegador igual muestre el WhatsApp de respaldo, pero sin mentir.
      console.error('[lead_sheet_error]', sheetRes.status);
      res.status(200).json({ ok: false, saved: false });
      return;
    }
    res.status(200).json({ ok: true, saved: true });
  } catch (err) {
    console.error('[lead_forward_error]', err && err.message);
    res.status(200).json({ ok: false, saved: false });
  }
};
