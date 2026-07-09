import os

HTML_CONTENT = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Páginas que Venden | Vértice Studio</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#060608;
  --acc:#D0FF00;
  --acc2:#FF4D1C;
  --white:#F5F5F0;
  --gray:#888;
  --border:rgba(255,255,255,0.07);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--white);font-family:'DM Sans',sans-serif;overflow-x:hidden;cursor:none}

/* CURSOR */
#cursor{position:fixed;width:12px;height:12px;border-radius:50%;background:var(--acc);pointer-events:none;z-index:9999;transition:transform 0.1s;mix-blend-mode:exclusion}
#cursor-ring{position:fixed;width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(208,255,0,0.4);pointer-events:none;z-index:9998;transition:all 0.15s ease;mix-blend-mode:exclusion;transform:translate(-50%,-50%)}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 40px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid transparent;transition:all 0.3s}
nav.scrolled{background:rgba(6,6,8,0.95);border-bottom:1px solid var(--border);backdrop-filter:blur(12px)}
.nav-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:18px;letter-spacing:-0.5px;color:var(--white)}
.nav-logo span{color:var(--acc)}
.nav-links{display:flex;gap:32px;list-style:none}
.nav-links a{color:var(--gray);text-decoration:none;font-size:14px;letter-spacing:0.3px;transition:color 0.2s}
.nav-links a:hover{color:var(--white)}
.nav-cta{background:var(--acc);color:var(--bg);padding:10px 22px;border-radius:100px;font-size:14px;font-weight:600;text-decoration:none;transition:all 0.2s;font-family:'DM Sans',sans-serif}
.nav-cta:hover{background:var(--white);transform:scale(1.04)}

/* HERO */
#hero{min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:0 40px 80px;position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 70% 40%,rgba(208,255,0,0.06) 0%,transparent 70%),radial-gradient(ellipse 40% 40% at 20% 80%,rgba(255,77,28,0.05) 0%,transparent 60%)}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
.hero-number{position:absolute;right:40px;top:50%;transform:translateY(-50%);font-family:'Syne',sans-serif;font-size:200px;font-weight:800;color:rgba(255,255,255,0.03);line-height:1;user-select:none;pointer-events:none}
.hero-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(208,255,0,0.1);border:1px solid rgba(208,255,0,0.25);color:var(--acc);padding:6px 16px;border-radius:100px;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:28px;width:fit-content}
.hero-tag::before{content:'';width:6px;height:6px;background:var(--acc);border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.8)}}
.hero-h1{font-family:'Syne',sans-serif;font-size:clamp(56px,8vw,120px);font-weight:800;line-height:0.92;letter-spacing:-3px;max-width:900px}
.hero-h1 .line{overflow:hidden;display:block}
.hero-h1 .line span{display:block;transform:translateY(110%);animation:slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards}
.hero-h1 .line:nth-child(1) span{animation-delay:0.1s}
.hero-h1 .line:nth-child(2) span{animation-delay:0.2s}
.hero-h1 .line:nth-child(3) span{animation-delay:0.3s}
@keyframes slideUp{to{transform:translateY(0)}}
.hero-h1 em{font-style:normal;color:var(--acc);-webkit-text-stroke:0px}
.hero-h1 .outline{-webkit-text-stroke:1.5px rgba(255,255,255,0.2);color:transparent}
.hero-sub{margin-top:28px;display:flex;align-items:center;gap:40px;opacity:0;animation:fadeIn 0.8s 0.7s forwards}
@keyframes fadeIn{to{opacity:1}}
.hero-sub p{font-size:17px;color:var(--gray);max-width:480px;line-height:1.6;font-weight:300}
.hero-cta-group{display:flex;gap:12px;flex-shrink:0}
.btn-primary{background:var(--acc);color:var(--bg);padding:16px 32px;border-radius:100px;font-size:15px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.25s;font-family:'DM Sans',sans-serif;white-space:nowrap}
.btn-primary:hover{background:var(--white);transform:translateY(-2px);box-shadow:0 20px 40px rgba(208,255,0,0.2)}
.btn-ghost{border:1px solid rgba(255,255,255,0.2);color:var(--white);padding:16px 32px;border-radius:100px;font-size:15px;font-weight:500;text-decoration:none;transition:all 0.25s;font-family:'DM Sans',sans-serif;white-space:nowrap}
.btn-ghost:hover{border-color:var(--white);background:rgba(255,255,255,0.05)}
.hero-stats{position:absolute;right:40px;bottom:80px;display:flex;flex-direction:column;gap:20px;opacity:0;animation:fadeIn 0.8s 0.9s forwards}
.stat{text-align:right}
.stat-n{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;color:var(--white);line-height:1}
.stat-n span{color:var(--acc)}
.stat-l{font-size:11px;color:var(--gray);letter-spacing:1px;text-transform:uppercase;margin-top:2px}

/* TICKER */
.ticker-wrap{overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:16px 0;background:rgba(255,255,255,0.01)}
.ticker{display:flex;gap:0;width:max-content;animation:ticker 30s linear infinite}
.ticker:hover{animation-play-state:paused}
.ticker-item{padding:0 40px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--gray);display:flex;align-items:center;gap:40px;white-space:nowrap}
.ticker-item span{color:var(--acc);font-size:18px}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* SECTIONS base */
section{padding:120px 40px}
.section-label{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--acc);font-weight:600;margin-bottom:20px;display:flex;align-items:center;gap:10px}
.section-label::before{content:'';width:24px;height:1px;background:var(--acc)}
.section-h2{font-family:'Syne',sans-serif;font-size:clamp(36px,5vw,72px);font-weight:800;line-height:0.95;letter-spacing:-2px;max-width:800px}
.section-h2 em{font-style:normal;color:var(--acc)}

/* SERVICES */
#servicios{background:var(--bg)}
.services-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:64px;flex-wrap:wrap;gap:24px}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border)}
.service-card{background:var(--bg);padding:40px;transition:all 0.3s;position:relative;overflow:hidden}
.service-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(208,255,0,0.03),transparent);opacity:0;transition:opacity 0.3s}
.service-card:hover{background:#0d0d10}
.service-card:hover::before{opacity:1}
.service-card:hover .service-icon{transform:scale(1.15) rotate(-5deg)}
.service-num{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,0.15);letter-spacing:2px;margin-bottom:20px}
.service-icon{font-size:36px;margin-bottom:20px;display:block;transition:transform 0.3s}
.service-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:700;margin-bottom:12px;letter-spacing:-0.5px}
.service-desc{font-size:14px;color:var(--gray);line-height:1.7;font-weight:300}
.service-tag{display:inline-block;margin-top:16px;font-size:11px;color:var(--acc);letter-spacing:1px;text-transform:uppercase;font-weight:600}

/* PROCESO */
#proceso{background:#08080b;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.process-header{margin-bottom:80px}
.process-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative}
.process-steps::before{content:'';position:absolute;top:40px;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--border) 20%,var(--border) 80%,transparent)}
.process-step{padding:32px 32px 32px 0;position:relative}
.step-n{font-family:'Syne',sans-serif;font-size:72px;font-weight:800;color:rgba(255,255,255,0.04);line-height:1;position:absolute;top:0;left:0}
.step-icon{width:52px;height:52px;border-radius:14px;background:rgba(208,255,0,0.1);border:1px solid rgba(208,255,0,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:20px;margin-top:16px;position:relative;z-index:1}
.step-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:10px;position:relative;z-index:1}
.step-desc{font-size:13px;color:var(--gray);line-height:1.7;font-weight:300;position:relative;z-index:1}
.step-time{display:inline-block;margin-top:14px;font-size:11px;color:var(--acc);letter-spacing:1px;font-weight:600;position:relative;z-index:1}

/* WHY */
#por-que{background:var(--bg)}
.why-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--border);margin-top:64px}
.why-card{background:var(--bg);padding:48px;transition:background 0.3s}
.why-card:hover{background:#0d0d10}
.why-card.featured{background:#0d1200;border:1px solid rgba(208,255,0,0.15)}
.why-card.featured:hover{background:#101500}
.why-num{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--acc);letter-spacing:2px;margin-bottom:16px}
.why-title{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;letter-spacing:-0.5px;margin-bottom:14px;line-height:1.1}
.why-desc{font-size:14px;color:var(--gray);line-height:1.8;font-weight:300}
.why-badge{display:inline-flex;align-items:center;gap:6px;margin-top:20px;background:rgba(208,255,0,0.12);border:1px solid rgba(208,255,0,0.25);color:var(--acc);padding:6px 14px;border-radius:100px;font-size:12px;font-weight:600;letter-spacing:0.5px}

/* FORM SECTION */
#formulario{background:#07070a;border-top:1px solid var(--border)}
.form-container{display:grid;grid-template-columns:1fr 1.6fr;gap:80px;margin-top:64px;align-items:start}
.form-left h3{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;letter-spacing:-1px;line-height:1.1;margin-bottom:20px}
.form-left p{font-size:14px;color:var(--gray);line-height:1.8;font-weight:300}
.form-features{margin-top:40px;display:flex;flex-direction:column;gap:16px}
.form-feat{display:flex;align-items:flex-start;gap:14px}
.form-feat-icon{width:32px;height:32px;border-radius:8px;background:rgba(208,255,0,0.1);border:1px solid rgba(208,255,0,0.2);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;margin-top:2px}
.form-feat-text strong{display:block;font-size:14px;font-weight:600;margin-bottom:2px}
.form-feat-text span{font-size:13px;color:var(--gray)}
.form-right{background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:20px;padding:40px}
.form-group{margin-bottom:20px}
.form-group label{display:block;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--gray);margin-bottom:8px;font-weight:500}
.form-group input,
.form-group textarea,
.form-group select{width:100%;padding:14px 16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:var(--white);font-family:'DM Sans',sans-serif;font-size:15px;outline:none;transition:all 0.2s;-webkit-appearance:none}
.form-group select option{background:#1a1a1a;color:var(--white)}
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus{border-color:var(--acc);background:rgba(208,255,0,0.03)}
.form-group textarea{resize:vertical;min-height:100px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.form-checks{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.check-btn{padding:14px 16px;border:1px solid rgba(255,255,255,0.1);border-radius:12px;background:rgba(255,255,255,0.03);color:var(--gray);cursor:pointer;text-align:left;transition:all 0.2s;font-family:'DM Sans',sans-serif;display:flex;flex-direction:column;gap:6px}
.check-btn:hover{border-color:rgba(208,255,0,0.3);background:rgba(208,255,0,0.04)}
.check-btn.active{border-color:var(--acc);background:rgba(208,255,0,0.08)}
.check-btn.active .cb-title{color:var(--acc)}
.check-btn.active .cb-desc{color:rgba(208,255,0,0.55)}
.cb-header{display:flex;align-items:center;gap:8px}
.cb-icon{font-size:18px;line-height:1}
.cb-title{font-size:13px;font-weight:600;color:var(--white);line-height:1;transition:color 0.2s}
.cb-desc{font-size:11px;color:rgba(255,255,255,0.32);line-height:1.5;font-weight:300;transition:color 0.2s}
.form-submit{width:100%;padding:18px;background:var(--acc);color:var(--bg);border:none;border-radius:12px;font-family:'Syne',sans-serif;font-size:16px;font-weight:800;cursor:pointer;letter-spacing:0.5px;transition:all 0.25s;margin-top:8px}
.form-submit:hover{background:var(--white);transform:translateY(-2px);box-shadow:0 20px 50px rgba(208,255,0,0.2)}
.form-note{text-align:center;margin-top:14px;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.6}
.form-success{display:none;text-align:center;padding:60px 20px}
.form-success h3{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;margin-bottom:12px}
.form-success p{color:var(--gray);font-size:15px;line-height:1.7}

/* PROJECTS GRID */
#proyectos{padding:120px 40px;border-top:1px solid var(--border);background:#08080b}
.projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.project-card{border-radius:16px;overflow:hidden;border:1px solid var(--border);background:#0d0d10;transition:transform 0.3s,border-color 0.3s}
.project-card:hover{transform:translateY(-6px);border-color:rgba(208,255,0,0.3)}
.project-mockup{height:200px;display:flex;align-items:center;justify-content:center;font-size:56px;position:relative;overflow:hidden}
.pc-1{background:linear-gradient(135deg,#0a1a0a,#1a3a00)}
.pc-2{background:linear-gradient(135deg,#1a0a0a,#3a1000)}
.pc-3{background:linear-gradient(135deg,#0a0a1a,#10003a)}
.pc-4{background:linear-gradient(135deg,#0a1a1a,#003a2a)}
.pc-5{background:linear-gradient(135deg,#1a1a0a,#3a2a00)}
.pc-6{background:linear-gradient(135deg,#1a0a1a,#2a0030)}
.project-mockup-lines{position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;padding:16px;opacity:0.25}
.mock-line{height:4px;border-radius:2px;background:rgba(255,255,255,0.4)}
.project-info{padding:20px}
.project-type{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--acc);font-weight:600;margin-bottom:6px}
.project-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;letter-spacing:-0.3px;margin-bottom:6px}
.project-desc{font-size:13px;color:var(--gray);line-height:1.6}
@media(max-width:900px){.projects-grid{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.projects-grid{grid-template-columns:1fr}}

/* FOOTER */
footer{padding:60px 40px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px}
.footer-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:20px}
.footer-logo span{color:var(--acc)}
.footer-links{display:flex;gap:24px}
.footer-links a{color:var(--gray);text-decoration:none;font-size:14px;transition:color 0.2s}
.footer-links a:hover{color:var(--white)}
.footer-copy{color:rgba(255,255,255,0.2);font-size:13px}

/* REVEAL */
.reveal{opacity:0;transform:translateY(32px);transition:opacity 0.7s ease,transform 0.7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:0.1s}
.reveal-delay-2{transition-delay:0.2s}
.reveal-delay-3{transition-delay:0.3s}
.reveal-delay-4{transition-delay:0.4s}

/* RESPONSIVE */
@media(max-width:900px){
  nav{padding:16px 24px}
  .nav-links{display:none}
  #hero{padding:0 24px 64px}
  .hero-stats{display:none}
  .hero-number{display:none}
  .hero-sub{flex-direction:column;align-items:flex-start;gap:24px}
  section{padding:80px 24px}
  .services-grid{grid-template-columns:1fr;gap:1px}
  .process-steps{grid-template-columns:1fr 1fr}
  .why-grid{grid-template-columns:1fr}
  .form-container{grid-template-columns:1fr;gap:40px}
  footer{flex-direction:column;align-items:flex-start}
}
@media(max-width:600px){
  .process-steps{grid-template-columns:1fr}
  .form-row{grid-template-columns:1fr}
  .hero-cta-group{flex-direction:column}
}
</style>
</head>
<body>

<div id="cursor"></div>
<div id="cursor-ring"></div>

<!-- NAV -->
<nav id="navbar">
  <div class="nav-logo">vértice<span>.</span>studio</div>
  <ul class="nav-links">
    <li><a href="#servicios">Servicios</a></li>
    <li><a href="#proceso">Proceso</a></li>
    <li><a href="#proyectos">Proyectos</a></li>
    <li><a href="#por-que">Nosotros</a></li>
  </ul>
  <a href="#formulario" class="nav-cta">Empecemos →</a>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="hero-number">JP</div>

  <div class="hero-tag">🟢 Disponible para proyectos</div>

  <h1 class="hero-h1">
    <span class="line"><span>Tu web</span></span>
    <span class="line"><span><em>no es un gasto.</em></span></span>
    <span class="line"><span class="outline">Es tu mejor vendedor.</span></span>
  </h1>

  <div class="hero-sub">
    <p>Diseñamos y construimos sitios, apps y landing pages que convierten visitas en clientes. Rápido, con IA, y con el nivel que tu negocio merece.</p>
    <div class="hero-cta-group">
      <a href="#formulario" class="btn-primary">Cotiza tu proyecto ↗</a>
      <a href="#proyectos" class="btn-ghost">Ver trabajos</a>
    </div>
  </div>

  <div class="hero-stats">
    <div class="stat">
      <div class="stat-n">48<span>h</span></div>
      <div class="stat-l">Primera entrega</div>
    </div>
    <div class="stat">
      <div class="stat-n">100<span>%</span></div>
      <div class="stat-l">Satisfacción</div>
    </div>
    <div class="stat">
      <div class="stat-n">+30<span></span></div>
      <div class="stat-l">Proyectos entregados</div>
    </div>
  </div>
</section>

<!-- TICKER -->
<div class="ticker-wrap">
  <div class="ticker">
    <div class="ticker-item">Landing Pages <span>✦</span> E-commerce <span>✦</span> Apps Web <span>✦</span> Portafolios <span>✦</span> Blogs <span>✦</span> SaaS <span>✦</span> Diseño UI/UX <span>✦</span> IA Integrada <span>✦</span> SEO <span>✦</span> Branding Digital <span>✦</span></div>
    <div class="ticker-item">Landing Pages <span>✦</span> E-commerce <span>✦</span> Apps Web <span>✦</span> Portafolios <span>✦</span> Blogs <span>✦</span> SaaS <span>✦</span> Diseño UI/UX <span>✦</span> IA Integrada <span>✦</span> SEO <span>✦</span> Branding Digital <span>✦</span></div>
  </div>
</div>

<!-- SERVICIOS -->
<section id="servicios">
  <div class="services-header">
    <div>
      <div class="section-label reveal">Lo que construimos</div>
      <h2 class="section-h2 reveal reveal-delay-1">Cada tipo de<br>sitio, <em>resuelto</em><br>con precisión.</h2>
    </div>
    <p class="reveal reveal-delay-2" style="max-width:320px;color:var(--gray);font-size:15px;line-height:1.8;font-weight:300">No somos agencia genérica. Cada proyecto tiene su propio concepto, estrategia y ejecución.</p>
  </div>

  <div class="services-grid">
    <div class="service-card reveal">
      <div class="service-num">01</div>
      <span class="service-icon">🚀</span>
      <div class="service-title">Landing Pages</div>
      <div class="service-desc">Una sola página diseñada para una sola cosa: convertir. Para lanzar productos, captar leads o validar una idea en horas.</div>
      <div class="service-tag">→ Desde 2 días</div>
    </div>
    <div class="service-card reveal reveal-delay-1">
      <div class="service-num">02</div>
      <span class="service-icon">🛍️</span>
      <div class="service-title">Tiendas Online</div>
      <div class="service-desc">E-commerce que vende mientras duermes. Catálogo, carrito, pasarela de pago y gestión de inventario integrados.</div>
      <div class="service-tag">→ Desde 7 días</div>
    </div>
    <div class="service-card reveal reveal-delay-2">
      <div class="service-num">03</div>
      <span class="service-icon">🤖</span>
      <div class="service-title">Apps con IA</div>
      <div class="service-desc">Herramientas inteligentes, asistentes virtuales, automatizaciones y SaaS con IA integrada. El futuro de tu industria, hoy.</div>
      <div class="service-tag">→ Cotización personalizada</div>
    </div>
    <div class="service-card reveal">
      <div class="service-num">04</div>
      <span class="service-icon">🏥</span>
      <div class="service-title">Sitios Profesionales</div>
      <div class="service-desc">Para médicos, psicólogos, abogados, coaches. Credibilidad al instante, agendamiento online y presencia que cierra consultas.</div>
      <div class="service-tag">→ Desde 5 días</div>
    </div>
    <div class="service-card reveal reveal-delay-1">
      <div class="service-num">05</div>
      <span class="service-icon">📱</span>
      <div class="service-title">Marca Personal</div>
      <div class="service-desc">Tu vitrina digital. Portafolio, blog, newsletter y links en un solo lugar que represente exactamente quién eres.</div>
      <div class="service-tag">→ Desde 3 días</div>
    </div>
    <div class="service-card reveal reveal-delay-2">
      <div class="service-num">06</div>
      <span class="service-icon">⚙️</span>
      <div class="service-title">SaaS & Plataformas</div>
      <div class="service-desc">Plataformas web con login, pagos recurrentes, roles de usuario y paneles de administración. De la idea al MVP en semanas.</div>
      <div class="service-tag">→ Desde 3 semanas</div>
    </div>
  </div>
</section>

<!-- PROCESO -->
<section id="proceso">
  <div class="process-header">
    <div class="section-label reveal">Cómo funciona</div>
    <h2 class="section-h2 reveal reveal-delay-1">4 pasos.<br><em>Sin sorpresas.</em><br>Sin enredos.</h2>
  </div>
  <div class="process-steps">
    <div class="process-step reveal">
      <div class="step-n">01</div>
      <div class="step-icon">📋</div>
      <div class="step-title">Brief Express</div>
      <div class="step-desc">Llenas nuestro formulario inteligente. En 10 minutos tenemos todo lo que necesitamos para arrancar sin idas y venidas.</div>
      <div class="step-time">→ 10 min</div>
    </div>
    <div class="process-step reveal reveal-delay-1">
      <div class="step-n">02</div>
      <div class="step-icon">🎨</div>
      <div class="step-title">Propuesta Visual</div>
      <div class="step-desc">En menos de 48 horas te entregamos mockup con la dirección de diseño. Apruebas antes de que escribamos una línea de código.</div>
      <div class="step-time">→ 48 horas</div>
    </div>
    <div class="process-step reveal reveal-delay-2">
      <div class="step-n">03</div>
      <div class="step-icon">💻</div>
      <div class="step-title">Desarrollo</div>
      <div class="step-desc">Construimos tu sitio en producción con acceso en tiempo real. Ves cómo va creciendo cada día. 2 rondas de ajustes incluidas.</div>
      <div class="step-time">→ 5-15 días</div>
    </div>
    <div class="process-step reveal reveal-delay-3">
      <div class="step-n">04</div>
      <div class="step-icon">🚀</div>
      <div class="step-title">Lanzamiento</div>
      <div class="step-desc">Dominio, hosting, SSL y analíticas configurados. Tu sitio lanzado y monitoreado. Con soporte post-lanzamiento garantizado.</div>
      <div class="step-time">→ Live</div>
    </div>
  </div>
</section>

<!-- PROYECTOS -->
<section id="proyectos">
  <div class="section-label reveal">Últimos trabajos</div>
  <h2 class="section-h2 reveal reveal-delay-1" style="margin-bottom:48px">Proyectos que<br><em>hablan por sí solos.</em></h2>
  <div class="projects-grid">
    <div class="project-card reveal">
      <div class="project-mockup pc-1">
        <div class="project-mockup-lines">
          <div class="mock-line" style="width:60%"></div><div class="mock-line" style="width:90%"></div><div class="mock-line" style="width:40%"></div><div class="mock-line" style="width:75%"></div>
        </div>
        🌿
      </div>
      <div class="project-info">
        <div class="project-type">Psicología · Landing</div>
        <div class="project-name">Sentir Studio</div>
        <div class="project-desc">Sitio para psicóloga clínica con agendamiento online. +300% en consultas en el primer mes.</div>
      </div>
    </div>
    <div class="project-card reveal reveal-delay-1">
      <div class="project-mockup pc-2">
        <div class="project-mockup-lines">
          <div class="mock-line" style="width:80%"></div><div class="mock-line" style="width:55%"></div><div class="mock-line" style="width:95%"></div><div class="mock-line" style="width:30%"></div>
        </div>
        🔒
      </div>
      <div class="project-info">
        <div class="project-type">Bienestar · App</div>
        <div class="project-name">Limita App</div>
        <div class="project-desc">Plataforma de control de hábitos con gamificación e IA para seguimiento personalizado.</div>
      </div>
    </div>
    <div class="project-card reveal reveal-delay-2">
      <div class="project-mockup pc-3">
        <div class="project-mockup-lines">
          <div class="mock-line" style="width:70%"></div><div class="mock-line" style="width:45%"></div><div class="mock-line" style="width:85%"></div><div class="mock-line" style="width:60%"></div>
        </div>
        🏢
      </div>
      <div class="project-info">
        <div class="project-type">SaaS · PropTech</div>
        <div class="project-name">Admin IA</div>
        <div class="project-desc">Sistema de administración de propiedad horizontal con IA para gestión de pagos y PQRS.</div>
      </div>
    </div>
    <div class="project-card reveal reveal-delay-1">
      <div class="project-mockup pc-4">
        <div class="project-mockup-lines">
          <div class="mock-line" style="width:50%"></div><div class="mock-line" style="width:90%"></div><div class="mock-line" style="width:35%"></div><div class="mock-line" style="width:70%"></div>
        </div>
        🎯
      </div>
      <div class="project-info">
        <div class="project-type">Consultoría · Marca Personal</div>
        <div class="project-name">Coach Ejecutivo</div>
        <div class="project-desc">Portafolio + blog para coach de liderazgo. 4x aumento en leads calificados desde LinkedIn.</div>
      </div>
    </div>
    <div class="project-card reveal reveal-delay-2">
      <div class="project-mockup pc-5">
        <div class="project-mockup-lines">
          <div class="mock-line" style="width:65%"></div><div class="mock-line" style="width:40%"></div><div class="mock-line" style="width:80%"></div><div class="mock-line" style="width:55%"></div>
        </div>
        🛍️
      </div>
      <div class="project-info">
        <div class="project-type">Moda · E-commerce</div>
        <div class="project-name">Tienda Fashion</div>
        <div class="project-desc">Tienda online con catálogo, carrito y pasarela PSE/tarjeta. 180 ventas en primer mes.</div>
      </div>
    </div>
    <div class="project-card reveal reveal-delay-3">
      <div class="project-mockup pc-6">
        <div class="project-mockup-lines">
          <div class="mock-line" style="width:75%"></div><div class="mock-line" style="width:50%"></div><div class="mock-line" style="width:90%"></div><div class="mock-line" style="width:40%"></div>
        </div>
        ⚖️
      </div>
      <div class="project-info">
        <div class="project-type">Legal · Profesional</div>
        <div class="project-name">Estudio Jurídico</div>
        <div class="project-desc">Firma de abogados con credibilidad premium, blog jurídico y captación de casos online.</div>
      </div>
    </div>

    <div class="project-card reveal reveal-delay-1" style="grid-column: span 3">
      <div style="display:grid;grid-template-columns:1fr 1fr">
        <div class="project-mockup" style="height:220px;background:linear-gradient(135deg,#0a0f1a,#001a3a);border-radius:0">
          <div class="project-mockup-lines">
            <div class="mock-line" style="width:85%"></div><div class="mock-line" style="width:60%"></div><div class="mock-line" style="width:95%"></div><div class="mock-line" style="width:45%"></div><div class="mock-line" style="width:70%"></div>
          </div>
          🏛️
        </div>
        <div class="project-info" style="padding:32px;display:flex;flex-direction:column;justify-content:center">
          <div class="project-type">GovTech · Inteligencia Artificial</div>
          <div class="project-name" style="font-size:24px;margin-bottom:10px">LicitaAI</div>
          <div class="project-desc" style="font-size:14px;line-height:1.7">Plataforma de inteligencia para contratación pública en Colombia. Analiza el SECOP en tiempo real con IA para identificar oportunidades de licitación, evaluar competidores y generar alertas personalizadas. Diseñada para empresas que quieren ganar contratos del Estado sin perder tiempo buscando manualmente.</div>
          <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
            <span style="font-size:11px;background:rgba(208,255,0,0.1);border:1px solid rgba(208,255,0,0.2);color:var(--acc);padding:4px 12px;border-radius:100px;font-weight:600">IA Nativa</span>
            <span style="font-size:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--gray);padding:4px 12px;border-radius:100px">SECOP II</span>
            <span style="font-size:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--gray);padding:4px 12px;border-radius:100px">Colombia</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- POR QUÉ -->
<section id="por-que">
  <div class="section-label reveal">Por qué elegirnos</div>
  <h2 class="section-h2 reveal reveal-delay-1">No somos la opción<br>más barata.<br>Somos la más <em>inteligente.</em></h2>
  <div class="why-grid">
    <div class="why-card featured reveal">
      <div class="why-num">01</div>
      <div class="why-title">IA nativa en todo lo que construimos</div>
      <div class="why-desc">No es buzzword. Usamos Claude, GPT y modelos especializados para construir funcionalidades que hace 2 años costaban 10 veces más. Chatbots, generación de contenido, análisis automático: todo integrado desde el día uno.</div>
      <div class="why-badge">⚡ Ventaja 2026</div>
    </div>
    <div class="why-card reveal reveal-delay-1">
      <div class="why-num">02</div>
      <div class="why-title">Entregamos en días, no en meses</div>
      <div class="why-desc">Con nuestro proceso de brief express y desarrollo paralelo, una landing funcional puede estar en tu poder en 48-72 horas. Sin burocracia, sin esperas eternas.</div>
    </div>
    <div class="why-card reveal reveal-delay-2">
      <div class="why-num">03</div>
      <div class="why-title">Diseño que vende, no solo que se ve bonito</div>
      <div class="why-desc">Cada decisión visual está respaldada por principios de conversión. Jerarquía, CTA, flujo del usuario, psicología del color. Construimos para que el visitante actúe, no solo para que admire.</div>
    </div>
    <div class="why-card featured reveal reveal-delay-3">
      <div class="why-num">04</div>
      <div class="why-title">Precio justo para el mercado colombiano y LATAM</div>
      <div class="why-desc">Calidad de agencia internacional, presupuesto que tiene sentido para tu etapa de negocio. Trabajamos con startups, profesionales independientes, PYMES y empresas en crecimiento.</div>
      <div class="why-badge">🇨🇴 Medellín · LATAM</div>
    </div>
  </div>
</section>

<!-- FORMULARIO -->
<section id="formulario">
  <div class="section-label reveal">Empecemos</div>
  <h2 class="section-h2 reveal reveal-delay-1">Tu proyecto<br><em>merece arrancar</em><br>ya.</h2>

  <div class="form-container">
    <div class="form-left reveal">
      <h3>Cuéntame qué necesitas. Te respondo en menos de 24h.</h3>
      <p>Sin llamadas de venta. Sin reuniones innecesarias. Con la información que me des, ya puedo enviarte una propuesta con precio, tiempo y estructura.</p>
      <div class="form-features">
        <div class="form-feat">
          <div class="form-feat-icon">⚡</div>
          <div class="form-feat-text"><strong>Propuesta en 24h</strong><span>Recibes precio y estructura sin esperar una semana</span></div>
        </div>
        <div class="form-feat">
          <div class="form-feat-icon">🎨</div>
          <div class="form-feat-text"><strong>Mockup antes de pagar</strong><span>Apruebas el diseño antes de comprometerte</span></div>
        </div>
        <div class="form-feat">
          <div class="form-feat-icon">🔒</div>
          <div class="form-feat-text"><strong>Sin letra pequeña</strong><span>Precio fijo, entregas acordadas, sin cobros sorpresa</span></div>
        </div>
        <div class="form-feat">
          <div class="form-feat-icon">🤝</div>
          <div class="form-feat-text"><strong>Soporte post-lanzamiento</strong><span>No desaparezco cuando entrego. Estoy para lo que necesites.</span></div>
        </div>
      </div>
    </div>

    <div class="form-right reveal reveal-delay-1">
      <div id="form-body">
        <div class="form-row">
          <div class="form-group">
            <label>Tu nombre *</label>
            <input type="text" id="f-nombre" placeholder="Ana García">
          </div>
          <div class="form-group">
            <label>WhatsApp / Teléfono *</label>
            <input type="tel" id="f-tel" placeholder="+57 300 123 4567">
          </div>
        </div>
        <div class="form-group">
          <label>Email *</label>
          <input type="email" id="f-email" placeholder="ana@tunegocio.com">
        </div>
        <div class="form-group">
          <label>Nombre de tu negocio o proyecto</label>
          <input type="text" id="f-negocio" placeholder="Ej: Sentir Studio, Mi Tienda, App XYZ...">
        </div>
        <div class="form-group">
          <label>¿Qué tipo de sitio necesitas?</label>
          <div class="form-checks" id="tipo-checks">

            <button class="check-btn" onclick="toggleCheck(this)">
              <div class="cb-header"><span class="cb-icon">🚀</span><span class="cb-title">Landing Page</span></div>
              <span class="cb-desc">Una sola página enfocada en un objetivo: que el visitante te contacte, compre o se registre. Ideal para lanzar un producto, servicio o evento rápidamente.</span>
            </button>

            <button class="check-btn" onclick="toggleCheck(this)">
              <div class="cb-header"><span class="cb-icon">🛍️</span><span class="cb-title">Tienda Online</span></div>
              <span class="cb-desc">Vende tus productos 24/7 sin intermediarios. Incluye catálogo, carrito de compras y pago con tarjeta o PSE. Para ropa, accesorios, alimentos, productos físicos o digitales.</span>
            </button>

            <button class="check-btn" onclick="toggleCheck(this)">
              <div class="cb-header"><span class="cb-icon">🤖</span><span class="cb-title">App con Inteligencia Artificial</span></div>
              <span class="cb-desc">Una herramienta web que usa IA para automatizar tareas, responder preguntas, generar contenido o analizar información. Para negocios que quieren diferenciarse con tecnología.</span>
            </button>

            <button class="check-btn" onclick="toggleCheck(this)">
              <div class="cb-header"><span class="cb-icon">🏥</span><span class="cb-title">Sitio Profesional o Corporativo</span></div>
              <span class="cb-desc">Presencia digital completa para tu empresa o consultorio. Da credibilidad, explica tus servicios, permite agendar citas y facilita que nuevos clientes te encuentren en Google.</span>
            </button>

            <button class="check-btn" onclick="toggleCheck(this)">
              <div class="cb-header"><span class="cb-icon">📱</span><span class="cb-title">Marca Personal</span></div>
              <span class="cb-desc">Tu vitrina digital como profesional independiente. Muestra quién eres, qué haces y qué has logrado. Ideal para coaches, consultores, creativos, speakers o freelancers.</span>
            </button>

            <button class="check-btn" onclick="toggleCheck(this)">
              <div class="cb-header"><span class="cb-icon">⚙️</span><span class="cb-title">Sistema o Plataforma Web</span></div>
              <span class="cb-desc">Una aplicación con login, roles de usuario, paneles y funcionalidades complejas. Para empresas que necesitan automatizar procesos internos o lanzar un producto de software (SaaS).</span>
            </button>

          </div>
        </div>
        <div class="form-group">
          <label>¿Cuál es tu presupuesto aproximado?</label>
          <select id="f-presupuesto">
            <option value="">— Selecciona —</option>
            <option>Menos de $1.000.000 COP</option>
            <option>$1M – $3M COP</option>
            <option>$3M – $7M COP</option>
            <option>$7M – $15M COP</option>
            <option>Más de $15M COP</option>
            <option>Prefiero que me cotices primero</option>
          </select>
        </div>
        <div class="form-group">
          <label>Cuéntame sobre tu proyecto (2-3 líneas)</label>
          <textarea id="f-desc" placeholder="Ej: Soy psicóloga y necesito un sitio donde la gente pueda agendar consulta online. Quiero que se vea profesional pero cálido..."></textarea>
        </div>
        <div class="form-group">
          <label>¿Tienes referencias o sitios que te gusten? (opcional)</label>
          <input type="text" id="f-ref" placeholder="https://ejemplo.com, https://otro.com...">
        </div>
        <button class="form-submit" onclick="submitForm()">Enviar y recibir propuesta →</button>
        <p class="form-note">Te respondo por WhatsApp o email en menos de 24 horas hábiles.<br>Tu información es 100% confidencial.</p>
      </div>
      <div class="form-success" id="form-success">
        <div style="font-size:56px;margin-bottom:20px">🎉</div>
        <h3>¡Recibido!</h3>
        <p>Ya tengo toda la info. Te escribo en menos de 24 horas con tu propuesta personalizada.</p>
        <p style="margin-top:12px;font-size:13px;color:rgba(255,255,255,0.3)">Revisa tu WhatsApp y email.</p>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-logo">vértice<span>.</span>studio</div>
  <div class="footer-links">
    <a href="#servicios">Servicios</a>
    <a href="#proceso">Proceso</a>
    <a href="#proyectos">Proyectos</a>
    <a href="#formulario">Contacto</a>
  </div>
  <div class="footer-copy">© 2026 Vértice Studio · Medellín, Colombia</div>
</footer>

<script>
// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mouseX=0,mouseY=0,ringX=0,ringY=0;
document.addEventListener('mousemove',e=>{
  mouseX=e.clientX;mouseY=e.clientY;
  cursor.style.left=mouseX-6+'px';cursor.style.top=mouseY-6+'px';
});
function animRing(){
  ringX+=(mouseX-ringX)*0.12;ringY+=(mouseY-ringY)*0.12;
  ring.style.left=ringX+'px';ring.style.top=ringY+'px';
  requestAnimationFrame(animRing);
}animRing();
document.querySelectorAll('a,button,.service-card,.project-card,.why-card,.check-btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.transform='scale(2.5)';ring.style.transform='translate(-50%,-50%) scale(1.5)'});
  el.addEventListener('mouseleave',()=>{cursor.style.transform='scale(1)';ring.style.transform='translate(-50%,-50%) scale(1)'});
});

// Navbar scroll
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  if(window.scrollY>60)navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Reveal on scroll
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// ─────────────────────────────────────────────────────────────────
// PASO 1 — Crea tu Google Sheet:
//   1. Ve a sheets.google.com → nuevo → ponle nombre (ej: "Leads Web")
//   2. En la fila 1 pon estos encabezados exactos en columnas A-J:
//      Fecha | Nombre | Teléfono | Email | Negocio | Tipo de Sitio | Presupuesto | Descripción | Referencias | Estado
//
// PASO 2 — Crea el Apps Script:
//   1. En el Sheet: Extensiones → Apps Script
//   2. Borra todo y pega este código:
//
// ────────────────────────────────────────────────
// function doPost(e) {
//   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   var data = JSON.parse(e.postData.contents);
//   sheet.appendRow([
//     data.fecha,
//     data.nombre,
//     data.telefono,
//     data.email,
//     data.negocio,
//     data.tipo,
//     data.presupuesto,
//     data.descripcion,
//     data.referencias,
//     "Nuevo"
//   ]);
//   return ContentService
//     .createTextOutput(JSON.stringify({result:"ok"}))
//     .setMimeType(ContentService.MimeType.JSON);
// }
// ────────────────────────────────────────────────
//
// PASO 3 — Despliega el Apps Script:
//   1. Clic en "Implementar" → "Nueva implementación"
//   2. Tipo: Aplicación web
//   3. Ejecutar como: Yo (tu cuenta)
//   4. Quién tiene acceso: Cualquier persona
//   5. Clic en "Implementar" → Copia la URL que aparece
//
// PASO 4 — Pega tu URL aquí abajo ↓
// ─────────────────────────────────────────────────────────────────

const GOOGLE_SCRIPT_URL = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";

// Form check toggles
function toggleCheck(btn){btn.classList.toggle('active')}

// Collect selected types
function getSelectedTypes(){
  return Array.from(document.querySelectorAll('#tipo-checks .check-btn.active'))
    .map(b=>b.textContent.trim()).join(', ') || 'No especificado';
}

// Form submit → Google Sheets
async function submitForm(){
  const nombre   = document.getElementById('f-nombre').value.trim();
  const telefono = document.getElementById('f-tel').value.trim();
  const email    = document.getElementById('f-email').value.trim();
  const negocio  = document.getElementById('f-negocio').value.trim();
  const presupuesto = document.getElementById('f-presupuesto').value;
  const descripcion = document.getElementById('f-desc').value.trim();
  const referencias = document.getElementById('f-ref').value.trim();
  const tipo = getSelectedTypes();

  if(!nombre||!telefono||!email){
    alert('Por favor completa nombre, teléfono y email para continuar.');
    return;
  }

  const btn = document.querySelector('.form-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  const payload = {
    fecha: new Date().toLocaleString('es-CO',{timeZone:'America/Bogota'}),
    nombre, telefono, email, negocio, tipo, presupuesto, descripcion, referencias
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    // no-cors no devuelve body, pero si no lanzó error llegó bien
    document.getElementById('form-body').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  } catch(err) {
    btn.textContent = 'Enviar y recibir propuesta →';
    btn.disabled = false;
    btn.style.opacity = '1';
    alert('Hubo un problema al enviar. Escríbeme directo al WhatsApp.');
    console.error(err);
  }
}
</script>
</body>
</html>"""

def main():
    root_dir = r"c:\Users\JuanPelaez\VERTICE.STUDIO"
    target_file = os.path.join(root_dir, "index.html")
    
    with open(target_file, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    
    print(f"Archivo index.html escrito satisfactoriamente en {target_file}")

if __name__ == "__main__":
    main()
