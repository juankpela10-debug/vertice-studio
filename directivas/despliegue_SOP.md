# Directiva: Despliegue en Producción — Vértice Studio

## Objetivo
Publicar la landing page estática de Vértice Studio en internet mediante Vercel CLI,
obteniendo una URL pública permanente.

> **Nota:** el proyecto se migró de Netlify a Vercel (plan gratuito, sin riesgo de
> cargo adicional vs. Railway que factura por uso). El flujo de Netlify CLI queda
> en desuso; el sitio antiguo en `verticestudioweb.netlify.app` puede seguir activo
> como respaldo hasta que se valide el nuevo despliegue.

## Entrada
- Directorio raíz del proyecto con `index.html` generado y validado localmente.
- `.vercelignore` en la raíz, que excluye del deploy `directivas/`, `scripts/`,
  `verticestudio-web/`, `.netlify/`, `.tmp/`, `.claude/` y los `index.backup-*.html`.

## Salida
- URL pública de producción (ej: `https://vertice-studio.vercel.app`)

## Pasos de Ejecución
1. Verificar que `vercel` esté disponible vía `npx`.
2. Si no hay sesión activa, ejecutar `npx vercel@latest login` (cuenta juan.pelaez@colibriit.com).
3. Ejecutar `npx vercel@latest --prod` desde la raíz del proyecto.
4. En el primer deploy, el CLI pregunta si vincular un proyecto existente o crear uno
   nuevo ("vertice-studio") — crear uno nuevo. Esto genera una carpeta local `.vercel/`
   con la configuración de vínculo; despliegues posteriores no vuelven a preguntar.
5. Confirmar la URL de producción al finalizar.

## Restricciones y Casos Borde
- Vercel requiere autenticación; si no hay token activo el CLI pide login (browser o email).
- El flag `--prod` es obligatorio para que el deploy sea de producción (sin él es un "preview").
- No se usa `vercel.json`: al ser un sitio estático plano sin build step, Vercel sirve
  el `index.html` raíz automáticamente.
- Evitar emojis en consola para no causar `UnicodeEncodeError` en Windows.
- Si el puerto 8080 del servidor local está corriendo, no afecta al despliegue en Vercel.
