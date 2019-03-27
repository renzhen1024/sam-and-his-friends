const http = require('http');

/**
 * Create HTTP server.
 */
http
	.createServer((req, res) => {
		res.writeHead(301, { Location: `https://${req.headers.host}` });
		return res.end();
	})
	.listen(80);
