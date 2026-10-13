const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8085;
const HOST = '0.0.0.0';
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  try {
    let reqPath = decodeURI(req.url.split('?')[0]);
    
    if (reqPath === '/' || reqPath === '') {
      res.writeHead(302, { 'Location': '/public/index.html' });
      return res.end();
    }

    // Mitigación estricta de Path Traversal (SEC-007)
    const normalized = path.normalize('/' + reqPath).replace(/^(\/\.\.)+/, '');
    let safePath = path.resolve(ROOT, '.' + normalized);

    // Comprobar que la ruta resuelta se encuentre estrictamente dentro de ROOT
    if (!safePath.startsWith(ROOT)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('403 Forbidden: Acceso fuera de la raíz denegado');
    }

    if (fs.existsSync(safePath) && fs.statSync(safePath).isDirectory()) {
      safePath = path.join(safePath, 'index.html');
    }

    if (!fs.existsSync(safePath) || !safePath.startsWith(ROOT)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }

    const data = fs.readFileSync(safePath);
    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Cabeceras defensivas y restricción de CORS a origen de desarrollo seguro
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Access-Control-Allow-Origin': 'http://localhost:8085'
    });
    res.end(data);
  } catch (err) {
    // No filtrar detalles internos ni stack traces al cliente (SEC-007)
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 Server Error: Ocurrió un error interno procesando la solicitud.');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor de desarrollo seguro iniciado en http://localhost:${PORT}/`);
  console.log(`Raíz protegida: ${ROOT}`);
});
