const { useState, useEffect, useRef } = React;

/* ============================================================
   Reveal-on-scroll wrapper
   ============================================================ */
function Reveal({ children, delay = 0, as: Tag = "div", className = "", style = {}, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.animationDelay = `${delay}ms`;
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  return (
    <section
      data-screen-label="Hero"
      style={{
        position: "relative",
        background: "#111111",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px 120px",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {/* subtle noise overlay */}
      <svg className="hero-noise" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* faint vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 980,
          width: "100%",
        }}
      >
        {/* Top label */}
        <div
          className="mono hero-anim"
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            animationDelay: "0.1s",
          }}
        >
          Medellín, Colombia · 2026
        </div>

        {/* Video centerpiece */}
        <div
          style={{
            position: "relative",
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Radial gold glow behind video */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(600px, 110vw)",
              height: "min(600px, 110vw)",
              background:
                "radial-gradient(circle, rgba(184,145,58,0.10) 0%, rgba(184,145,58,0.04) 35%, transparent 70%)",
              filter: "blur(8px)",
              animation: "glowPulse 6s ease-in-out infinite",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <div
            className="hero-video-anim"
            style={{
              position: "relative",
              zIndex: 1,
              animationDelay: "0.2s",
            }}
          >
            <HeroVideo />
          </div>
        </div>

        {/* Brand name */}
        <div
          className="serif hero-anim"
          style={{
            marginTop: 32,
            fontSize: "clamp(24px, 3.4vw, 36px)",
            letterSpacing: "-0.02em",
            color: "#fff",
            fontWeight: 500,
            animationDelay: "0.45s",
          }}
        >
          Vértice Studio
        </div>

        {/* Tagline */}
        <h1
          className="hero-anim"
          style={{
            margin: "16px 0 0",
            fontSize: "clamp(34px, 6.5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#fff",
            fontWeight: 500,
            animationDelay: "0.6s",
          }}
        >
          Páginas que{" "}
          <span
            className="serif"
            style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 500 }}
          >
            venden.
          </span>
        </h1>

        {/* Promises */}
        <div
          className="hero-anim"
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "rgba(255,255,255,0.45)",
            fontSize: 13,
            letterSpacing: "0.02em",
            flexWrap: "wrap",
            justifyContent: "center",
            animationDelay: "0.75s",
          }}
        >
          <span>Diseño premium</span>
          <span className="gold-dot" />
          <span>Automatización IA</span>
          <span className="gold-dot" />
          <span>Cero plantillas</span>
        </div>

        {/* CTA */}
        <div
          className="hero-anim"
          style={{ marginTop: 40, animationDelay: "0.9s" }}
        >
          <a href="#contacto" style={{ textDecoration: "none" }} onClick={() => window.gtag?.('event', 'cta_click', { location: 'hero', button_text: 'Agendar llamada' })}>
            <button className="cta-gold">
              Agendar llamada <span className="arrow">→</span>
            </button>
          </a>
        </div>
      </div>

      {/* Scroll chevron */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.25)",
          animation: "chevronBounce 1.8s ease-in-out infinite",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}

function HeroVideo() {
  const videoRef = useRef(null);
  const [size, setSize] = useState(() => getSize(typeof window !== "undefined" ? window.innerWidth : 1200));

  function getSize(w) {
    if (w >= 1024) return 480;
    if (w >= 768) return 400;
    if (w >= 480) return 280;
    return 240;
  }

  useEffect(() => {
    const onResize = () => setSize(getSize(window.innerWidth));
    window.addEventListener("resize", onResize);
    // ensure autoplay starts on mobile
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      style={{
        width: size,
        height: size,
        objectFit: "cover",
        background: "#111111",
        display: "block",
      }}
      src="assets/logo.mp4"
    />
  );
}

/* ============================================================
   CONTACT FORM — con EmailJS
   ============================================================ */
function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    tipo: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.emailjs) {
      window.emailjs.init("EMAILJS_PUBLIC_KEY");
    }
  }, []);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
    setError(false);
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.tipo) {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      await window.emailjs.send("service_ID", "template_ID", {
        from_name: form.nombre,
        from_email: form.email,
        from_empresa: form.empresa,
        from_telefono: form.telefono,
        from_tipo: form.tipo,
        to_email: "juan.pelaez@colibriit.com",
      });

      window.gtag?.('event', 'form_submit', {
        tipo_proyecto: form.tipo,
        value: 1
      });

      setSubmitted(true);
      setForm({ nombre: "", email: "", empresa: "", telefono: "", tipo: "" });
      setTimeout(() => setSubmitted(false), 2600);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contacto"
      data-screen-label="Contacto"
      style={{
        background: "#fff",
        padding: "clamp(64px, 9vw, 96px) 24px",
      }}
    >
      <div style={{ maxWidth: 540, margin: "0 auto" }}>
        <Reveal>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              margin: 0,
              fontSize: "clamp(26px, 4.4vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.015em",
              textAlign: "center",
              color: "var(--black)",
              marginBottom: 40,
              fontStyle: "normal",
            }}
          >
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}>
              Cuéntanos tu{" "}
            </span>
            <span style={{ fontStyle: "italic" }}>proyecto</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={onSubmit}
            style={{
              background: "var(--beige)",
              border: "1px solid var(--line)",
              borderRadius: 24,
              padding: "clamp(24px, 5vw, 40px)",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <Field label="Nombre">
              <input
                className="vs-input"
                type="text"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => update("nombre", e.target.value)}
                required
              />
            </Field>

            <Field label="Email">
              <input
                className="vs-input"
                type="email"
                placeholder="hola@empresa.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </Field>

            <Field label="Empresa">
              <input
                className="vs-input"
                type="text"
                placeholder="Nombre de tu empresa"
                value={form.empresa}
                onChange={(e) => update("empresa", e.target.value)}
              />
            </Field>

            <Field label="Teléfono">
              <input
                className="vs-input"
                type="tel"
                placeholder="+57 300 000 0000"
                value={form.telefono}
                onChange={(e) => update("telefono", e.target.value)}
              />
            </Field>

            <Field label="Tipo de proyecto">
              <select
                className="vs-select"
                value={form.tipo}
                onChange={(e) => update("tipo", e.target.value)}
                required
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="landing">Landing page</option>
                <option value="sitio">Sitio web</option>
                <option value="auto">Automatización</option>
                <option value="ecom">E-commerce</option>
                <option value="otro">Otro</option>
              </select>
            </Field>

            {error && (
              <div style={{
                background: "rgba(220, 38, 38, 0.1)",
                color: "var(--black)",
                padding: "12px 16px",
                borderRadius: 12,
                fontSize: 13,
                marginTop: 8
              }}>
                {submitted ? "Error al enviar. Intenta vía WhatsApp" : "Completa los campos requeridos"}
              </div>
            )}

            <button
              type="submit"
              className="cta-black"
              disabled={loading}
              style={{ marginTop: 8, opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Enviando..." : submitted ? "Recibido — te contactamos pronto ✓" : <>Agendar llamada <span>→</span></>}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <span className="vs-label">{label}</span>
      {children}
    </label>
  );
}

/* ============================================================
   HOOKS PERSONALIZADOS
   ============================================================ */
function useCTAPulse() {
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      setShowPulse(false);
      timer = setTimeout(() => setShowPulse(true), 8000);
    };

    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);
    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  return showPulse;
}

/* ============================================================
   STATS SECTION — Trust Signals
   ============================================================ */
function StatsSection() {
  const [counts, setCounts] = useState({ proyectos: 0, clientes: 0, conversión: 0 });

  useEffect(() => {
    const targets = { proyectos: 50, clientes: 35, conversión: 340 };
    const intervals = {};

    Object.keys(targets).forEach(key => {
      let current = 0;
      intervals[key] = setInterval(() => {
        current += Math.ceil(targets[key] / 30);
        if (current >= targets[key]) current = targets[key];
        setCounts(c => ({ ...c, [key]: current }));
      }, 30);
    });

    return () => Object.values(intervals).forEach(clearInterval);
  }, []);

  return (
    <section
      data-screen-label="Estadísticas"
      style={{
        background: "#f8f5f0",
        padding: "60px 24px",
        textAlign: "center"
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 40,
        maxWidth: 1100,
        margin: "0 auto"
      }}>
        <div>
          <div style={{
            fontSize: "clamp(36px, 5vw, 48px)",
            fontWeight: 700,
            color: "var(--gold)"
          }}>{counts.proyectos}+</div>
          <div style={{
            fontSize: 14,
            color: "rgba(13,13,13,0.6)",
            marginTop: 8
          }}>Proyectos Completados</div>
        </div>
        <div>
          <div style={{
            fontSize: "clamp(36px, 5vw, 48px)",
            fontWeight: 700,
            color: "var(--gold)"
          }}>{counts.clientes}+</div>
          <div style={{
            fontSize: 14,
            color: "rgba(13,13,13,0.6)",
            marginTop: 8
          }}>Clientes Activos</div>
        </div>
        <div>
          <div style={{
            fontSize: "clamp(36px, 5vw, 48px)",
            fontWeight: 700,
            color: "var(--gold)"
          }}>{counts.conversión}%</div>
          <div style={{
            fontSize: 14,
            color: "rgba(13,13,13,0.6)",
            marginTop: 8
          }}>Promedio Conversión</div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MARQUEE
   ============================================================ */
const PROJECTS = [
  "E-commerce Premium",
  "SaaS Dashboard",
  "Landing Conversión",
  "Portal Corporativo",
  "App Inmobiliaria",
  "Tienda Automatizada",
  "Web3 Platform",
  "Catálogo Digital",
];

function Marquee() {
  const items = [...PROJECTS, ...PROJECTS]; // duplicate for loop
  return (
    <section
      data-screen-label="Trabajos"
      className="marquee"
      style={{
        background: "#fff",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "32px 0",
        overflow: "hidden",
      }}
    >
      <div className="marquee-track">
        {items.map((name, i) => (
          <ProjectCard key={i} name={name} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ name, index }) {
  const isGold = index % 2 === 0;
  return (
    <div
      style={{
        flexShrink: 0,
        margin: "0 12px",
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        width: "min(420px, 78vw)",
        height: "clamp(220px, 38vw, 340px)",
        background: isGold
          ? "linear-gradient(135deg, rgba(184,145,58,0.18) 0%, rgba(184,145,58,0.04) 100%)"
          : "linear-gradient(135deg, #0D0D0D 0%, #1a1a1a 100%)",
        color: isGold ? "var(--black)" : "#fff",
        display: "flex",
        alignItems: "flex-end",
        padding: 22,
      }}
    >
      {/* faint inner border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          border: isGold ? "1px solid rgba(184,145,58,0.2)" : "1px solid rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      />
      {/* abstract decoration */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 22,
          right: 22,
          width: 36, height: 36,
          borderRadius: 999,
          border: isGold
            ? "1px solid rgba(184,145,58,0.45)"
            : "1px solid rgba(184,145,58,0.55)",
          opacity: 0.85,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 36,
          right: 36,
          width: 8, height: 8,
          borderRadius: 999,
          background: "var(--gold)",
        }}
      />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: isGold ? "rgba(13,13,13,0.5)" : "rgba(255,255,255,0.4)",
          }}
        >
          {String((index % PROJECTS.length) + 1).padStart(2, "0")} · Caso
        </span>
        <span
          className="serif"
          style={{
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   BOTTOM FLOATING NAV
   ============================================================ */
function BottomNav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    function onScroll() {
      const threshold = window.innerHeight * 0.85;
      setShow(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`bottom-nav ${show ? "is-shown" : ""}`}>
      <span
        className="serif"
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "var(--black)",
          lineHeight: 1,
          fontStyle: "italic",
        }}
      >
        V
      </span>
      <span className="gold-dot" />
      <a href="#contacto" style={{ textDecoration: "none" }}>
        <button
          style={{
            background: "var(--black)",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "9px 18px",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "inherit",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            transition: "background 180ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--black)")}
        >
          Agendar llamada <span style={{ fontSize: 14 }}>→</span>
        </button>
      </a>
    </nav>
  );
}

/* ============================================================
   APP
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "ring"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const showPulse = useCTAPulse();
  const HeroComponent =
    tweaks.heroVariant === "ring" ? window.RingHero :
    tweaks.heroVariant === "water" ? window.WaterHero :
    Hero;

  return (
    <div>
      <HeroComponent />
      <Marquee />
      <StatsSection />
      <window.Proceso />
      <window.Servicios />
      <window.Portfolio />
      <window.Testimonios />
      <window.Pricing />
      <window.PorQue />
      <window.FAQ />
      <ContactForm />
      <window.CTAFinal />
      <window.DarkFooter />
      <BottomNav />
      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero">
          <TweakRadio
            label="Variant"
            value={tweaks.heroVariant}
            onChange={(v) => setTweak("heroVariant", v)}
            options={[
              { value: "ring", label: "Ring (split)" },
              { value: "water", label: "Water type" },
              { value: "video", label: "Video logo" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function Footer() {
  return (
    <footer
      data-screen-label="Footer"
      style={{
        background: "#fff",
        borderTop: "1px solid var(--line)",
        padding: "40px 24px 100px",
        textAlign: "center",
        color: "rgba(13,13,13,0.4)",
        fontSize: 12,
        letterSpacing: "0.02em",
      }}
    >
      <div className="mono" style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
        © 2026 Vértice Studio · Medellín, Colombia
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
