/* Hero v3 — Split layout: text left, MP4 water-ring logo right */

function RingHero() {
  return (
    <section
      data-screen-label="Hero · Ring"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background:
        "linear-gradient(180deg, #FBF7EF 0%, #F4EDE0 100%)",
        color: "var(--black)"
      }}>
      
      {/* (background kept clean — same gradient as page) */}
      

      {/* Top strip */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: "clamp(24px, 5vw, 64px)",
          right: "clamp(24px, 5vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 6
        }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            className="serif"
            style={{
              fontSize: 18,
              fontWeight: 600,
              fontStyle: "italic",
              color: "var(--black)",
              lineHeight: 1
            }}>
            
            V
          </span>
          <span className="gold-dot" />
          <span
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(13,13,13,0.65)"
            }}>
            
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
            gap: 28
          }}>
          
          <span>Trabajos</span>
          <span>Estudio</span>
          <span>Contacto</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          alignItems: "center",
          gap: "clamp(24px, 4vw, 64px)",
          padding: "clamp(96px, 12vh, 140px) clamp(32px, 6vw, 96px) 64px", opacity: "1"
        }}>
        
        {/* LEFT: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 620
          }}>
          
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
              gap: 12
            }}>
            
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--gold)" }} />
            Medellín, Colombia · 2026
          </div>

          <h1
            className="hero-anim serif"
            style={{
              margin: 0,
              fontSize: "clamp(40px, 5.6vw, 76px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              fontWeight: 500,
              color: "var(--black)",
              animationDelay: "0.3s"
            }}>
            
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
              fontSize: "clamp(15px, 1.15vw, 17px)",
              lineHeight: 1.6,
              color: "rgba(13,13,13,0.6)",
              maxWidth: 480,
              animationDelay: "0.45s"
            }}>
            
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
              flexWrap: "wrap"
            }}>
            
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
                  transition: "background 180ms ease, border-color 180ms ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(13,13,13,0.04)";
                  e.currentTarget.style.borderColor = "rgba(13,13,13,0.32)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(13,13,13,0.18)";
                }}>
                
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
              flexWrap: "wrap"
            }}>
            
            <span>Diseño premium</span>
            <span className="gold-dot" />
            <span>Automatización IA</span>
            <span className="gold-dot" />
            <span>Cero plantillas</span>
          </div>
        </div>

        {/* RIGHT: water-ring logo (raised) */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "min(620px, 72vh)",
            transform: "translateY(-6%)"
          }}>
          
          <RingLogo />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "clamp(32px, 6vw, 96px)",
          bottom: 36,
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "rgba(13,13,13,0.5)"
        }}>
        
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <span
          style={{
            display: "inline-block",
            width: 56, height: 1,
            background: "rgba(13,13,13,0.3)",
            position: "relative",
            overflow: "hidden"
          }}>
          
          <span
            style={{
              position: "absolute", top: 0, left: 0, width: 14, height: 1,
              background: "var(--gold)",
              animation: "scrollDash 2.4s ease-in-out infinite"
            }} />
          
        </span>
      </div>
    </section>);

}

function RingLogo() {
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "min(620px, 100%)",
        aspectRatio: "1 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center", color: "rgba(13, 13, 13, 0.08)"
      }}>
      
      {/* (clean — no extra rings, glows, or shadows) */}
      

      {/* The video itself, masked to a circle */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="assets/logo.mp4"
        className="hero-video-anim"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
          background: "transparent",
          display: "block",
          mixBlendMode: "darken",
          animationDelay: "0.2s"
        }} />
      


    </div>);

}

window.RingHero = RingHero;