const https = require('https');

const SITE_ID = '52cdf9c7-711c-4db6-bdfe-fd66ba70b613';
const NEW_NAME = 'vertice-studio';

// Usaremos el token que el Netlify CLI guardó en tu máquina
const { execSync } = require('child_process');
let token;
try {
    token = execSync('npx netlify-cli@latest status --json').toString();
    token = JSON.parse(token).auth.token;
} catch (e) {
    console.error('No se pudo obtener el token de Netlify CLI. Asegúrate de estar logueado.');
    process.exit(1);
}

const data = JSON.stringify({ name: NEW_NAME });

const options = {
  hostname: 'api.netlify.com',
  path: `/api/v1/sites/${SITE_ID}`,
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log(`EXITO: Sitio renombrado a ${NEW_NAME}`);
      console.log(`URL: https://${NEW_NAME}.netlify.app`);
    } else {
      console.error(`ERROR (${res.statusCode}): ${body}`);
      if (body.includes('already taken')) {
          console.log('El nombre ya está ocupado. Intentaremos con vertice-studio-co...');
      }
    }
  });
});

req.on('error', (error) => { console.error(error); });
req.write(data);
req.end();
