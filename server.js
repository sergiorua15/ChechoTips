const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname);

const server = http.createServer((req, res) => {
    let requestedFile = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(publicDir, requestedFile);

    // Validar que la ruta solicitada esté dentro del directorio público
    if (!filePath.startsWith(publicDir)) {
        res.writeHead(403);
        res.end('Acceso prohibido');
        return;
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(500);
                res.end('Error del servidor: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(8081, 'localhost', () => {
    console.log('Servidor corriendo en http://localhost:8081/');
});