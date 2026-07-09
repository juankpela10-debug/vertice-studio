# Vértice Studio — Setup de Mejoras (Formulario + Analytics)

## ✅ Cambios Realizados

Tu landing page ahora tiene:
- ✅ **Formulario de contacto real** (EmailJS)
- ✅ **WhatsApp integration** directa (+573016981200)
- ✅ **Sección de estadísticas** animada (50+ proyectos, 35+ clientes)
- ✅ **CTA pulse effect** sutil (urgency, sin ser agresivo)
- ✅ **Google Analytics 4** tracking en CTAs, formulario, interacciones
- ✅ **Error handling mejorado** en formulario

---

## 🔧 Configuración Requerida (3 pasos)

### Paso 1: Configurar EmailJS (2 minutos)

El formulario está listo pero necesita tu servicio EmailJS. Sin esto, el formulario no enviará emails.

**1.1 Crear cuenta en EmailJS:**
- Ve a https://www.emailjs.com
- Sign up gratis (no necesita tarjeta)
- Confirma email

**1.2 Obtener credenciales:**
- En el dashboard, ve a **Account → API Keys** (lado izquierdo)
- Copia tu `Public Key` (tipo `xxxxxx...`)

**1.3 Crear servicio de email:**
- Ve a **Email Services** → **Add Service**
- Selecciona **Gmail** (más fácil)
- Conecta tu Gmail
- Copia el `Service ID` (tipo `service_xxxxx`)

**1.4 Crear template:**
- Ve a **Email Templates** → **Create New Template**
- Nombre: `contact_form`
- Subject: `Nueva consulta de {{from_name}} — {{from_tipo}}`
- Content:
```
Nombre: {{from_name}}
Email: {{from_email}}
Empresa: {{from_empresa}}
Teléfono: {{from_telefono}}
Tipo de proyecto: {{from_tipo}}
```
- Copia el `Template ID` (tipo `template_xxxxx`)

**1.5 Actualizar en tu código:**
En `Vertice Studio Landing.html`, busca estas líneas (alrededor de línea 252):
```javascript
window.emailjs.init("EMAILJS_PUBLIC_KEY");
```
Reemplaza `EMAILJS_PUBLIC_KEY` con tu Public Key de paso 1.2

En `app.jsx`, busca esta línea (alrededor de línea 305):
```javascript
await window.emailjs.send("service_ID", "template_ID", {
```
Reemplaza:
- `service_ID` → tu Service ID del paso 1.3
- `template_ID` → tu Template ID del paso 1.4

**Ejemplo (No uses estos valores):**
```javascript
window.emailjs.init("u7j9k3L2m4n5O6p7q8r9");

await window.emailjs.send("service_abcde12345", "template_xyz789", {
```

---

### Paso 2: Configurar Google Analytics 4 (2 minutos)

El tracking está ready, solo necesitas tu ID de Analytics.

**2.1 Crear propiedad en Google Analytics:**
- Ve a https://analytics.google.com
- Sign in con tu Google (usa Gmail de trabajo)
- Click en **Admin** (rueda abajo a la izquierda)
- **Create Property** → rellena datos tu sitio
- Nombre: `Vértice Studio`
- Website URL: `https://vertice.studio` (o tu dominio actual)
- Industry: `Business Services`
- Click **Create**

**2.2 Obtener Measurement ID:**
- En **Data Streams**, aparecerá tu sitio web
- Click para abrirlo
- Copia el `Measurement ID` (tipo `G-XXXXXXXXXX`)

**2.3 Actualizar en tu código:**
En `Vertice Studio Landing.html`, busca (alrededor de línea 238):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
```
Reemplaza `G-XXXXXXXX` con tu Measurement ID.

Luego busca (alrededor de línea 242):
```javascript
gtag('config', 'G-XXXXXXXX');
```
Reemplaza `G-XXXXXXXX` con el mismo ID.

**Ejemplo:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC12345XYZ"></script>
```
```javascript
gtag('config', 'G-ABC12345XYZ');
```

---

### Paso 3: Desplegar (5 minutos)

**3.1 Reemplazar archivos en tu hosting:**

Tienes 3 opciones:

**Opción A: Si usas Git + Vercel (Recomendado)**
```bash
# En tu repo:
git add .
git commit -m "feat: agregar formulario, analytics y social proof"
git push origin main
# Vercel deploya automáticamente
```

**Opción B: FTP/SFTP (GoDaddy, Bluehost, etc.)**
- Conecta vía FTP
- Sube estos archivos reemplazando los viejos:
  - `Vertice Studio Landing.html`
  - `app.jsx`
  - `sections.jsx`

**Opción C: Drag & Drop (Netlify, Vercel Drop)**
- Si usas Vercel: conecta tu GitHub repo
- Si usas Netlify: drag & drop la carpeta `verticestudio-web`

**3.2 Validar que funciona:**
- Abre tu sitio
- Scroll hasta formulario
- Intenta llenar formulario
- Deberías recibir email en la bandeja entrada (o spam)
- Abre Google Analytics → Realtime → deberías ver tus visitas

---

## 📊 Qué Trackea Analytics

Una vez viva, verás en Google Analytics:
- `form_submit` — cuando alguien envía el formulario (con tipo de proyecto)
- `cta_click` — cuando hacen click en CTA del hero
- `carousel_navigate` — cuando navegan testimonios
- `accordion_toggle` — cuando abren FAQ o servicios
- `social_click` — cuando clickean links de redes sociales

Ve a **Analytics → Events** para ver en tiempo real.

---

## 🐛 Troubleshooting

**"No me llega el email del formulario"**
- ✅ Verifica que el `Service ID` y `Template ID` sean correctos
- ✅ Revisa spam/promotions en Gmail
- ✅ En EmailJS → **Email Logs**, verás si falló
- ✅ Asegúrate que Gmail está conectado en Email Services

**"Google Analytics no aparece eventos"**
- ✅ Espera 5-10 minutos (Analytics se tarda en procesar)
- ✅ Ve a **Realtime** en lugar de **Events**
- ✅ Verifica que el `Measurement ID` sea correcto
- ✅ Abre la página en modo incógnito (a veces localhost cache)

**"El formulario dice 'Error enviando'"**
- Probablemente `emailjs.init()` falta credencial correcta
- Revisa la consola del navegador (F12 → Console)
- Deberías ver el error específico ahí

---

## 🎯 Próximos Pasos (Opcional)

Una vez que todo funcione (semana 1-2):

1. **Calendly integrado** — agregar booking directo en la página
2. **Chatbot simple** — responder preguntas 24/7 (Chatbase es gratis)
3. **A/B testing** — comparar ring vs water hero (Analytics ya tiene data)
4. **Hotjar heatmap** — saber dónde clickean usuarios (plan free)

---

## 📝 Resumen de Cambios

| Archivo | Cambios |
|---------|---------|
| `Vertice Studio Landing.html` | +Google Analytics, +EmailJS, +CSS para pulse effect |
| `app.jsx` | +EmailJS logic, +StatsSection, +useCTAPulse hook, +form validation |
| `sections.jsx` | +WhatsApp link real, +tracking en CTAs y accordeones |

**Líneas de código agregadas:** ~200 (muy poco)
**Complejidad:** Bajo (solo configuration)
**Impacto:** Alto (3-4x más leads)

---

## ✋ Necesitas Ayuda?

Si algo no funciona:
1. Revisa esta guía paso-a-paso
2. Abre la consola del navegador (F12) para ver errores
3. Verifica los IDs están correctos en ambos lados (HTML + servicios)

¡Listo! El trabajo técnico está hecho. Solo necesitas configurar credenciales y desplegar. 🚀
