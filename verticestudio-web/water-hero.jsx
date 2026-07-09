/* Water-typography hero v2 — subtle, text-first, water as foundation */

const { useEffect: useEffectWH, useRef: useRefWH, useState: useStateWH } = React;

function WaterHero() {
  return (
    <section
      data-screen-label="Hero · Water"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #FBF7EF 0%, #F6EFE2 55%, #EFE5D2 100%)",
        color: "var(--black)",
      }}
    >
      {/* SVG defs */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="rippleSoftBlur"><feGaussianBlur stdDeviation="0.6" /></filter>
          <linearGradient id="floorGradV2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6EFE2" stopOpacity="0" />
            <stop offset="40%" stopColor="#EFE5D2" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E2D3B5" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="waterFadeTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6EFE2" stopOpacity="1" />
            <stop offset="100%" stopColor="#F6EFE2" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Soft warm light from upper right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 82% 18%, rgba(255,236,200,0.55) 0%, rgba(255,236,200,0) 42%)",
          pointerEvents: "none",
        }}
      />

      {/* Top strip: brand mark + nav */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: "clamp(24px, 5vw, 64px)",
          right: "clamp(24px, 5vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            className="serif"
            style={{
              fontSize: 18,
              fontWeight: 600,
              fontStyle: "italic",
              color: "var(--black)",
              lineHeight: 1,
            }}
          >
            V
          </span>
          <span className="gold-dot" />
          <span
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(13,13,13,0.65)",
            }}
          >
            Vértice Studio
          </span>
        </div>
        <div
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(13,13,13,0.45)",
            display: "flex",
            gap: 28,
          }}
        >
          <span>Trabajos</span>
          <span>Estudio</span>
          <span>Contacto</span>
        </div>
      </div>

      {/* ===== TEXT FIRST: headline + CTA, well above the water line ===== */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(80px, 10vh, 120px) clamp(32px, 6vw, 96px) 0",
          // pull content up so it sits clearly above the lower-third water surface
          paddingBottom: "38vh",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            className="hero-anim mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--gold)",
              animationDelay: "0.1s",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--gold)" }} />
            Medellín, Colombia · 2026
          </div>

          <h1
            className="hero-anim serif"
            style={{
              margin: 0,
              fontSize: "clamp(44px, 6.4vw, 88px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              fontWeight: 500,
              color: "var(--black)",
              animationDelay: "0.3s",
            }}
          >
            Páginas que fluyen,
            <br />
            <span style={{ fontStyle: "italic", color: "var(--gold)" }}>
              que venden.
            </span>
          </h1>

          <p
            className="hero-anim"
            style={{
              margin: 0,
              fontSize: "clamp(15px, 1.2vw, 17px)",
              lineHeight: 1.6,
              color: "rgba(13,13,13,0.6)",
              maxWidth: 520,
              animationDelay: "0.45s",
            }}
          >
            Diseño premium y automatización con IA para marcas que no quieren
            parecer otra plantilla más. Hechas a mano en Medellín.
          </p>

          <div
            className="hero-anim"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              animationDelay: "0.6s",
              flexWrap: "wrap",
            }}
          >
            <a href="#contacto" style={{ textDecoration: "none" }}>
              <button className="cta-gold">
                Agendar llamada <span className="arrow">→</span>
              </button>
            </a>
            <a href="#trabajos" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "transparent",
                  color: "var(--black)",
                  border: "1px solid rgba(13,13,13,0.18)",
                  borderRadius: 999,
                  padding: "13px 24px",
                  fontSize: 15,
                  fontFamily: "inherit",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 180ms ease, border-color 180ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(13,13,13,0.04)";
                  e.currentTarget.style.borderColor = "rgba(13,13,13,0.32)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(13,13,13,0.18)";
                }}
              >
                Ver trabajos
              </button>
            </a>
          </div>

          <div
            className="hero-anim mono"
            style={{
              marginTop: 12,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(13,13,13,0.4)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              animationDelay: "0.75s",
              flexWrap: "wrap",
            }}
          >
            <span>Diseño premium</span>
            <span className="gold-dot" />
            <span>Automatización IA</span>
            <span className="gold-dot" />
            <span>Cero plantillas</span>
          </div>
        </div>
      </div>

      {/* ===== Subtle wordmark overlay — refined, never dominant ===== */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "clamp(24px, 5vw, 64px)",
          bottom: "calc(33% + 20px)",
          zIndex: 4,
          textAlign: "right",
          opacity: 0.55,
          mixBlendMode: "multiply",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
        }}
      >
        <div
          className="serif"
          style={{
            fontSize: "clamp(14px, 1.1vw, 16px)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(13,13,13,0.7)",
            fontWeight: 500,
          }}
        >
          Vértice
        </div>
        <div
          className="serif"
          style={{
            fontSize: "clamp(12px, 0.95vw, 14px)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontStyle: "italic",
            fontWeight: 500,
          }}
        >
          studio
        </div>
      </div>

      {/* ===== WATER: lower third, soft + slightly blurred ===== */}
      <WaterSurface />

      {/* Scroll cue, bottom-right above water */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "clamp(24px, 5vw, 64px)",
          bottom: "calc(33% + 56px)",
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "rgba(13,13,13,0.5)",
        }}
      >
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <span
          style={{
            display: "inline-block",
            width: 56, height: 1,
            background: "rgba(13,13,13,0.35)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute", top: 0, left: 0, width: 14, height: 1,
              background: "var(--gold)",
              animation: "scrollDash 2.4s ease-in-out infinite",
            }}
          />
        </span>
      </div>
    </section>
  );
}

/* ============================================================
   Water surface — lower third, subtle blur, gentle ripples
   ============================================================ */
function WaterSurface() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "33%",
        zIndex: 3,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Top fade so water blends into beige */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background:
            "linear-gradient(to bottom, rgba(246,239,226,1) 0%, rgba(246,239,226,0) 100%)",
          zIndex: 4,
        }}
      />

      <svg
        viewBox="0 0 1600 400"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          filter: "blur(0.4px)",
        }}
      >
        {/* Soft floor tint */}
        <rect x="0" y="0" width="1600" height="400" fill="url(#floorGradV2)" />

        {/* Horizontal ripple bands */}
        {Array.from({ length: 16 }).map((_, i) => {
          const y = 60 + i * 20;
          const opacity = 0.06 + (i % 4) * 0.025;
          const dur = 7 + (i % 5);
          return (
            <path
              key={i}
              d={`M 0 ${y} Q 400 ${y - 2} 800 ${y} T 1600 ${y}`}
              fill="none"
              stroke="#B8913A"
              strokeOpacity={opacity}
              strokeWidth="0.7"
              filter="url(#rippleSoftBlur)"
            >
              <animate
                attributeName="d"
                dur={`${dur}s`}
                repeatCount="indefinite"
                values={`
                  M 0 ${y} Q 400 ${y - 2} 800 ${y} T 1600 ${y};
                  M 0 ${y} Q 400 ${y + 3} 800 ${y - 1} T 1600 ${y};
                  M 0 ${y} Q 400 ${y - 2} 800 ${y} T 1600 ${y}
                `}
              />
            </path>
          );
        })}

        {/* A few brighter highlight ripples */}
        {Array.from({ length: 5 }).map((_, i) => {
          const y = 110 + i * 50;
          return (
            <path
              key={`h-${i}`}
              d={`M 0 ${y} Q 500 ${y - 4} 1000 ${y} T 1600 ${y}`}
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity={0.32}
              strokeWidth="0.8"
            >
              <animate
                attributeName="d"
                dur={`${9 + i}s`}
                repeatCount="indefinite"
                values={`
                  M 0 ${y} Q 500 ${y - 4} 1000 ${y} T 1600 ${y};
                  M 0 ${y} Q 500 ${y + 4} 1000 ${y - 2} T 1600 ${y};
                  M 0 ${y} Q 500 ${y - 4} 1000 ${y} T 1600 ${y}
                `}
              />
            </path>
          );
        })}

        {/* Slow drifting highlight specks */}
        {Array.from({ length: 8 }).map((_, i) => {
          const cy = 150 + (i * 27) % 220;
          const r = 1.2 + (i % 3) * 0.4;
          const dur = 14 + (i % 6) * 2;
          return (
            <circle key={`s-${i}`} cx={0} cy={cy} r={r} fill="#FFFFFF" opacity={0.5}>
              <animate attributeName="cx" from="-20" to="1620" dur={`${dur}s`} repeatCount="indefinite" begin={`${i * 1.4}s`} />
              <animate attributeName="opacity" values="0;0.5;0" dur={`${dur}s`} repeatCount="indefinite" begin={`${i * 1.4}s`} />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}

window.WaterHero = WaterHero;
