// 'http'是node內建的套件，直接require它
const http = require('http');

// req, res 是自訂變數
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        // content-type設為純文字
        // 'Content-Type': 'text/plain'
        // content-type設為html
        'Content-Type': 'text/html'

    });
    res.end(`
        <h2>Hello</h2>
        <p>${req.url}</p>
    `);
});

server.listen(2000);