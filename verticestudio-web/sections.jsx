/* Vértice Studio — additional sections (Proceso, Servicios, Portfolio,
   Testimonios, Pricing, Por qué, FAQ, Final CTA, Footer dark, Copyright) */

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* ---------- Reveal-on-scroll wrapper (local) ---------- */
function R({ children, delay = 0, as: Tag = "div", className = "", style = {}, ...rest }) {
  const ref = useRefS(null);
  useEffectS(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.style.animationDelay = `${delay}ms`;
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} style={style} {...rest}>{children}</Tag>;
}

/* ============================================================
   PROCESO
   ============================================================ */
function Proceso() {
  const steps = [
    { n: "01", t: "Diagnóstico", d: "Analizamos tu negocio, competencia y público. Sin supuestos — datos." },
    { n: "02", t: "Diseño + Desarrollo", d: "Prototipo en 5 días. Iteramos contigo hasta que sea exacto. Cero plantillas." },
    { n: "03", t: "Lanzamiento + Optimización", d: "Publicamos, medimos, ajustamos. Tu web mejora cada semana." },
  ];
  return (
    <section data-screen-label="Proceso" style={{ background: "#fff", padding: "clamp(80px, 11vw, 112px) 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <R>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
            Cómo trabajamos
          </div>
        </R>
        <R delay={120}>
          <h2 className="serif" style={{ margin: "0 0 64px", fontSize: "clamp(30px, 4.6vw, 48px)", letterSpacing: "-0.02em", fontWeight: 500, color: "var(--black)" }}>
            <span style={{ fontStyle: "italic" }}>Tres</span> pasos.
          </h2>
        </R>

        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
          {/* connecting line desktop */}
          <div aria-hidden style={{ position: "absolute", top: 80, left: "10%", right: "10%", height: 1, background: "var(--line)", display: "none" }} className="proceso-line" />

          {steps.map((s, i) => (
            <R key={s.n} delay={150 + i * 120}>
              <div style={{ background: "var(--beige)", border: "1px solid var(--line)", borderRadius: 24, padding: "clamp(28px, 3vw, 40px)" }}>
                <div className="serif" style={{ fontSize: 48, fontWeight: 700, color: "rgba(184,145,58,0.3)", marginBottom: 16, lineHeight: 1 }}>
                  {s.n}
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--black)" }}>{s.t}</h3>
                <p style={{ margin: "10px 0 0", fontSize: 14, color: "rgba(13,13,13,0.6)", lineHeight: 1.6 }}>{s.d}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICIOS — accordion
   ============================================================ */
function Servicios() {
  const items = [
    { name: "Landing Pages de Conversión", price: "Desde $800 USD", desc: "Páginas de una sola misión: convertir. Diseño persuasivo, copy que vende, velocidad brutal.", featured: true },
    { name: "Sitios Web Corporativos", price: "Desde $1,500 USD", desc: "Tu presencia digital completa. Diseño a medida, SEO incluido, administrable." },
    { name: "Automatización con IA", price: "Desde $600 USD/mes", desc: "Chatbots, flujos de email, CRM automatizado. Tu negocio trabaja mientras duermes." },
    { name: "E-commerce", price: "Desde $2,000 USD", desc: "Tiendas online que venden solas. Pasarelas de pago, inventario, analytics." },
    { name: "Mantenimiento Web", price: "Desde $200 USD/mes", desc: "Updates, seguridad, backups, soporte prioritario. Sin sorpresas." },
  ];
  const [open, setOpen] = useStateS(0);

  return (
    <section data-screen-label="Servicios" style={{ background: "#fff", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <R>
          <h2 className="serif" style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", letterSpacing: "-0.02em", fontWeight: 500, color: "var(--black)" }}>
            Lo que <span style={{ fontStyle: "italic" }}>hacemos</span>
          </h2>
        </R>
        <R delay={120}>
          <p style={{ margin: "12px 0 48px", fontSize: 16, color: "rgba(13,13,13,0.5)" }}>
            Cada servicio diseñado para un solo resultado: que tu negocio crezca.
          </p>
        </R>

        <div>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <R key={it.name} delay={i * 80}>
                <div
                  onClick={() => {
                    window.gtag?.('event', 'accordion_toggle', { section: 'servicios', service_index: i, is_open: !isOpen });
                    setOpen(isOpen ? -1 : i);
                  }}
                  style={{
                    borderBottom: "1px solid var(--line)",
                    borderLeft: it.featured ? "2px solid var(--gold)" : "2px solid transparent",
                    paddingLeft: it.featured ? 18 : 0,
                    cursor: "pointer",
                    transition: "padding 220ms ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", gap: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 500, color: "var(--black)" }}>
                      {it.featured && <span style={{ color: "var(--gold)", marginRight: 8 }}>★</span>}
                      {it.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontSize: 13, color: "var(--gold)" }}>{it.price}</span>
                      <span style={{
                        display: "inline-block", width: 22, textAlign: "center",
                        fontSize: 22, color: "var(--black)",
                        transition: "transform 240ms ease",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}>+</span>
                    </div>
                  </div>
                  <div style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? 200 : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 320ms ease, opacity 240ms ease, padding 220ms ease",
                    paddingBottom: isOpen ? 24 : 0,
                  }}>
                    <p style={{ margin: 0, fontSize: 14, color: "rgba(13,13,13,0.6)", lineHeight: 1.7, maxWidth: 720 }}>
                      {it.desc}
                    </p>
                  </div>
                </div>
              </R>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PORTFOLIO
   ============================================================ */
function Portfolio() {
  const projects = [
    { name: "Nova Commerce", desc: "E-commerce premium para marca de moda independiente",
      gradient: "linear-gradient(135deg, rgba(184,145,58,0.22) 0%, transparent 100%)" },
    { name: "AutoFlow CRM", desc: "Sistema de automatización para empresa de logística",
      gradient: "linear-gradient(135deg, #0D0D0D 0%, #1a1a1a 100%)" },
    { name: "Meridian Capital", desc: "Landing page de conversión para fondo de inversión",
      gradient: "linear-gradient(135deg, rgba(184,145,58,0.12) 0%, var(--beige) 100%)" },
  ];
  return (
    <section data-screen-label="Portfolio" style={{ background: "var(--beige)", padding: "80px 24px" }}>
      <R>
        <h2 className="serif" style={{
          margin: "0 0 64px",
          marginLeft: "clamp(20px, 6vw, 112px)",
          fontSize: "clamp(30px, 4.6vw, 48px)",
          letterSpacing: "-0.02em", fontWeight: 500, color: "var(--black)",
        }}>
          Proyectos
        </h2>
      </R>
      <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
        {projects.map((p, i) => (
          <R key={p.name} delay={i * 100}>
            <div>
              <div style={{ marginLeft: "clamp(20px, 6vw, 112px)", marginBottom: 20 }}>
                <div className="serif" style={{ fontSize: 24, fontWeight: 600, color: "var(--black)", letterSpacing: "-0.01em" }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 14, color: "rgba(13,13,13,0.5)", marginTop: 6 }}>
                  {p.desc}
                </div>
              </div>
              <div style={{ background: "#111111", borderRadius: 24, padding: 16 }}>
                <div
                  style={{
                    width: "100%",
                    height: "clamp(260px, 38vw, 500px)",
                    borderRadius: 16,
                    background: p.gradient,
                    transition: "transform 400ms ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
            </div>
          </R>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIOS — auto-scroll carousel
   ============================================================ */
function Testimonios() {
  const data = [
    { name: "Camila Restrepo", role: "CEO, MontañaVerde", quote: "Triplicamos las ventas online en 60 días. Vértice entiende negocio, no solo diseño.", metric: "+340% conversión" },
    { name: "Andrés Mejía", role: "Founder, LogiTrack", quote: "El CRM automatizado nos ahorró 20 horas semanales. ROI en el primer mes.", metric: "20hrs/semana ahorradas" },
    { name: "Valentina Ospina", role: "CMO, Kōri Studio", quote: "La landing convirtió al 12% desde el primer día. Nunca habíamos tenido esos números.", metric: "12% tasa de conversión" },
    { name: "Santiago Duque", role: "Director, Capital Andino", quote: "Profesionales, rápidos, sin rodeos. Exactamente lo que necesitábamos.", metric: "Entrega en 14 días" },
    { name: "Laura Henao", role: "COO, FreshBox", quote: "Nuestra tienda online factura 3x más que la anterior. La inversión se pagó sola.", metric: "3x facturación" },
  ];
  const tripled = [...data, ...data, ...data];
  const [idx, setIdx] = useStateS(data.length);
  const [paused, setPaused] = useStateS(false);
  const trackRef = useRefS(null);

  useEffectS(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => i + 1), 3500);
    return () => clearInterval(t);
  }, [paused]);

  // wrap silently when reaching the end of triple
  useEffectS(() => {
    if (idx >= tripled.length - 2) {
      const t = setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = "none";
        setIdx(data.length);
        requestAnimationFrame(() => {
          if (trackRef.current) trackRef.current.style.transition = "";
        });
      }, 700);
      return () => clearTimeout(t);
    }
  }, [idx]);

  const cardW = 400;
  const gap = 24;

  return (
    <section data-screen-label="Testimonios" style={{ background: "#fff", padding: "80px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
        <R>
          <h2 className="serif" style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", letterSpacing: "-0.02em", fontWeight: 500, color: "var(--black)" }}>
            Lo que <span style={{ fontStyle: "italic" }}>dicen</span>
          </h2>
        </R>
        <R delay={120}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {[0,1,2,3,4].map(i => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#B8913A">
                <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.2L2 10l7.1-1.1z" />
              </svg>
            ))}
            <span style={{ fontSize: 14, color: "rgba(13,13,13,0.5)", marginLeft: 6 }}>5.0 en Google</span>
          </div>
        </R>
      </div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ position: "relative", padding: "0 24px" }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap,
              transform: `translateX(calc(50% - ${cardW/2}px - ${idx * (cardW + gap)}px))`,
              transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {tripled.map((t, i) => (
              <article key={i} style={{
                flex: `0 0 ${cardW}px`,
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 32,
                padding: 32,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(184,145,58,0.25)" style={{ marginBottom: 14 }}>
                  <path d="M7 7h4v4H7v6H3v-6c0-2.2 1.8-4 4-4zm10 0h4v4h-4v6h-4v-6c0-2.2 1.8-4 4-4z" />
                </svg>
                <p style={{ margin: 0, fontSize: 16, color: "var(--black)", lineHeight: 1.55 }}>
                  {t.quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
                  <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(184,145,58,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
                    {t.name[0]}
                  </span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--black)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(13,13,13,0.4)" }}>{t.role}</div>
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gold)", marginTop: 16 }}>
                  {t.metric}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
          <button onClick={() => {
            window.gtag?.('event', 'carousel_navigate', { section: 'testimonios', direction: 'prev' });
            setIdx(i => i - 1);
          }} aria-label="Anterior" style={navBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button onClick={() => {
            window.gtag?.('event', 'carousel_navigate', { section: 'testimonios', direction: 'next' });
            setIdx(i => i + 1);
          }} aria-label="Siguiente" style={navBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
const navBtn = {
  width: 40, height: 40, borderRadius: "50%",
  border: "1px solid rgba(13,13,13,0.15)",
  background: "transparent", color: "var(--black)",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", transition: "background 180ms ease, border-color 180ms ease",
};

/* ============================================================
   PRICING
   ============================================================ */
function Pricing() {
  return (
    <section data-screen-label="Pricing" style={{ background: "var(--beige)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <R>
          <h2 className="serif" style={{ margin: "0 0 12px", fontSize: "clamp(30px, 4.6vw, 48px)", letterSpacing: "-0.02em", fontWeight: 500, color: "var(--black)" }}>
            Invierte en <span style={{ fontStyle: "italic" }}>resultados</span>
          </h2>
        </R>
        <R delay={120}>
          <p style={{ margin: "0 0 64px", fontSize: 14, color: "rgba(13,13,13,0.5)" }}>
            Sin letra pequeña. Sin sorpresas. Sin contratos eternos.
          </p>
        </R>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, textAlign: "left" }}>
          {/* Dark card */}
          <R delay={200}>
            <div style={{ background: "var(--black)", color: "#fff", borderRadius: 32, padding: 40, position: "relative" }}>
              <span style={{ display: "inline-block", background: "var(--gold)", color: "#0D0D0D", fontSize: 12, padding: "5px 12px", borderRadius: 999, marginBottom: 24, fontWeight: 500 }}>
                Más popular
              </span>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Paquete Mensual</h3>
              <p style={{ margin: "10px 0 24px", fontSize: 14, color: "rgba(255,255,255,0.5)", whiteSpace: "pre-line" }}>
                {"Equipo dedicado de diseño + desarrollo.\nTrabajas directo con el fundador."}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 24 }}>
                <span className="serif" style={{ fontSize: 40, fontWeight: 600 }}>$1,500 USD</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>/mes</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                {["Diseño ilimitado", "Desarrollo a medida", "Automatizaciones incluidas", "Soporte prioritario"].map(x => (
                  <li key={x} style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ color: "var(--gold)" }}>✓</span>{x}
                  </li>
                ))}
              </ul>
              <a href="#contacto" style={{ textDecoration: "none" }}>
                <button style={{ width: "100%", background: "var(--gold)", color: "#0D0D0D", border: "none", borderRadius: 999, padding: "14px 24px", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                  Agendar llamada →
                </button>
              </a>
            </div>
          </R>

          {/* Light card */}
          <R delay={320}>
            <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 32, padding: 40 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "var(--black)" }}>Proyecto Único</h3>
              <p style={{ margin: "10px 0 24px", fontSize: 14, color: "rgba(13,13,13,0.5)", whiteSpace: "pre-line" }}>
                {"Alcance fijo, timeline fijo.\nMismo equipo, mismos estándares."}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 24 }}>
                <span className="serif" style={{ fontSize: 40, fontWeight: 600, color: "var(--black)" }}>$800 USD</span>
                <span style={{ fontSize: 14, color: "rgba(13,13,13,0.3)" }}>mínimo</span>
              </div>
              <a href="#contacto" style={{ textDecoration: "none" }}>
                <button style={{ width: "100%", background: "#fff", color: "var(--black)", border: "1px solid var(--line)", borderRadius: 999, padding: "14px 24px", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                  Cotizar proyecto →
                </button>
              </a>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   POR QUÉ VÉRTICE
   ============================================================ */
function PorQue() {
  const reasons = [
    { icon: <polygon points="16 6 28 26 4 26" />, t: "Sin plantillas. Punto.", d: "Cada pixel está puesto con intención. No reciclamos diseños entre clientes." },
    { icon: <polygon points="16 4 28 16 16 28 4 16" />, t: "IA donde importa", d: "Automatizamos lo repetitivo para que tu equipo se enfoque en lo que genera dinero." },
    { icon: <circle cx="16" cy="16" r="12" />, t: "Resultados, no entregables", d: "No vendemos 'páginas bonitas'. Vendemos más clientes, más ventas, más eficiencia." },
    { icon: <polygon points="16 4 27 10 27 22 16 28 5 22 5 10" />, t: "Fundador involucrado", d: "No te asigno un junior. Yo dirijo cada proyecto personalmente." },
  ];
  return (
    <section data-screen-label="Por qué" style={{ background: "#fff", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <R>
          <h2 className="serif" style={{ margin: "0 0 64px", fontSize: "clamp(30px, 4.6vw, 48px)", letterSpacing: "-0.02em", fontWeight: 500, color: "var(--black)" }}>
            Por qué <span style={{ fontStyle: "italic" }}>Vértice</span>
          </h2>
        </R>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {reasons.map((r, i) => (
            <R key={r.t} delay={i * 150}>
              <div style={{ background: "var(--beige)", border: "1px solid var(--line)", borderRadius: 24, padding: 32 }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#B8913A" strokeWidth="1.5">
                  {r.icon}
                </svg>
                <h3 style={{ margin: "16px 0 0", fontSize: 18, fontWeight: 600, color: "var(--black)" }}>{r.t}</h3>
                <p style={{ margin: "8px 0 0", fontSize: 14, color: "rgba(13,13,13,0.6)", lineHeight: 1.6 }}>{r.d}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
function FAQ() {
  const items = [
    ["¿Cuánto tarda un proyecto?", "Landing pages: 7-10 días. Sitios completos: 3-4 semanas. E-commerce: 4-6 semanas. Siempre con fechas claras desde el día uno."],
    ["¿Usan plantillas?", "Jamás. Todo se diseña desde cero. Cada negocio es diferente y su web debería serlo también."],
    ["¿Qué incluye el mantenimiento?", "Updates de seguridad, backups diarios, optimización de velocidad, soporte por WhatsApp en horario laboral, y cambios menores ilimitados."],
    ["¿Puedo cancelar el plan mensual?", "Sí, sin penalidad. Solo necesitas avisar con 15 días de anticipación. Sin contratos de permanencia."],
    ["¿Trabajan con clientes fuera de Colombia?", "Sí. Atendemos clientes en LATAM, Estados Unidos y España. Todo remoto, mismo nivel de calidad."],
    ["¿Qué pasa si no me gusta el diseño?", "Iteramos hasta que quede perfecto. Incluimos hasta 3 rondas de revisiones en cada proyecto. Si después de eso no estás satisfecho, devolvemos tu dinero."],
    ["¿Manejan hosting y dominio?", "Sí. Nos encargamos de todo lo técnico para que tú solo te preocupes por tu negocio."],
    ["¿Cómo es el proceso de pago?", "50% al iniciar, 50% al entregar. Para planes mensuales, pago al inicio de cada mes. Aceptamos transferencia, tarjeta y PayPal."],
  ];
  const [open, setOpen] = useStateS(-1);
  return (
    <section data-screen-label="FAQ" style={{ background: "#fff", padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <R>
          <h2 className="serif" style={{ margin: "0 0 48px", fontSize: "clamp(30px, 4.6vw, 48px)", letterSpacing: "-0.02em", fontWeight: 500, color: "var(--black)", fontStyle: "italic" }}>
            Preguntas
          </h2>
        </R>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", columnGap: 48 }}>
          {items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <R key={q} delay={i * 60}>
                <div onClick={() => {
                  window.gtag?.('event', 'accordion_toggle', { section: 'faq', question_index: i, is_open: !isOpen });
                  setOpen(isOpen ? -1 : i);
                }}
                  style={{ borderBottom: "1px solid var(--line)", padding: "20px 0", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 16, fontWeight: 500, color: "var(--black)" }}>{q}</span>
                    <span style={{ fontSize: 20, color: "var(--black)", transition: "transform 240ms ease", transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                  </div>
                  <div style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? 240 : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 320ms ease, opacity 240ms ease, padding 220ms ease",
                    paddingTop: isOpen ? 12 : 0,
                  }}>
                    <p style={{ margin: 0, fontSize: 14, color: "rgba(13,13,13,0.6)", lineHeight: 1.7 }}>{a}</p>
                  </div>
                </div>
              </R>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA FINAL — gold cursor trail
   ============================================================ */
function CTAFinal() {
  const ref = useRefS(null);
  useEffectS(() => {
    const el = ref.current;
    if (!el) return;
    let last = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - last < 60) return;
      last = now;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const dot = document.createElement("span");
      dot.style.cssText = `
        position:absolute;left:${x}px;top:${y}px;width:12px;height:12px;
        margin:-6px 0 0 -6px;border-radius:50%;background:#B8913A;
        pointer-events:none;transition:transform 800ms ease, opacity 800ms ease;
        opacity:1;transform:scale(1);z-index:1;
      `;
      el.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.transform = "scale(0)";
        dot.style.opacity = "0";
      });
      setTimeout(() => dot.remove(), 820);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      data-screen-label="CTA Final"
      style={{
        position: "relative",
        background: "#111111",
        padding: "clamp(128px, 18vw, 192px) 24px",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden",
        cursor: "crosshair",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <svg className="hero-noise" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.025 }}>
        <filter id="ctaNoise"><feTurbulence baseFrequency="0.9" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#ctaNoise)" />
      </svg>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
        <R>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
            ¿Listo?
          </div>
        </R>
        <R delay={120}>
          <h2 style={{
            margin: "0 0 48px",
            fontSize: "clamp(40px, 6.5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
          }}>
            Tu negocio merece
            <br />
            <span className="serif" style={{ fontStyle: "italic", color: "var(--gold)" }}>una web que trabaje.</span>
          </h2>
        </R>
        <R delay={240}>
          <a href="#contacto" style={{ textDecoration: "none", display: "inline-block" }}>
            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                background: "#fff", color: "var(--black)", border: "none",
                borderRadius: 999, padding: "12px 18px 12px 12px",
                fontSize: 15, fontFamily: "inherit", fontWeight: 500,
                cursor: "pointer", transition: "transform 180ms ease",
                boxShadow: "0 2px 8px rgba(255,255,255,0.1), 0 8px 32px rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(0.98)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <span className="serif" style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(184,145,58,0.2)", color: "var(--gold)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 700, fontStyle: "italic",
              }}>V</span>
              Hablar con Juan →
            </button>
          </a>
        </R>
      </div>
    </section>
  );
}

/* ============================================================
   DARK FOOTER + COPYRIGHT
   ============================================================ */
function DarkFooter() {
  return (
    <footer data-screen-label="Footer" style={{ background: "#111111", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 48, paddingTop: 12, alignItems: "flex-start" }}>
          <a href="#contacto" style={{ textDecoration: "none" }}>
            <button style={{
              background: "var(--gold)", color: "#0D0D0D",
              borderRadius: 999, border: "none", padding: "12px 24px",
              fontSize: 14, fontWeight: 500, fontFamily: "inherit", cursor: "pointer",
            }}>Agendar llamada</button>
          </a>
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Servicios","#servicios"],["Proyectos","#proyectos"],["Proceso","#proceso"],["Precios","#precios"]].map(([n,h]) => (
                <li key={n}><a href={h} style={footLink}>{n}</a></li>
              ))}
            </ul>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Instagram","https://instagram.com"],["WhatsApp","https://wa.me/573016981200?text=Hola%20Vértice%20Studio%2C%20quiero%20consultar"],["LinkedIn","https://linkedin.com"]].map(([n,h]) => (
                <li key={n}>
                  <a href={h} target="_blank" rel="noopener" onClick={() => window.gtag?.('event', 'social_click', { platform: n.toLowerCase() })} style={footLink}>{n}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div style={{ background: "#111111" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2026 Vértice Studio</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Medellín, Colombia</span>
        </div>
      </div>
    </footer>
  );
}
const footLink = {
  fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none",
  transition: "color 300ms ease",
};

window.Proceso = Proceso;
window.Servicios = Servicios;
window.Portfolio = Portfolio;
window.Testimonios = Testimonios;
window.Pricing = Pricing;
window.PorQue = PorQue;
window.FAQ = FAQ;
window.CTAFinal = CTAFinal;
window.DarkFooter = DarkFooter;
