#!/usr/bin/env node

/**
 * @module src/server
 * Import the express app and use nodejs' http module to set up a server
 */
const debug = require('debug')('sam-and-his-friends:server');
const http = require('http');

const app = require('./app');

const server = http.createServer(app());

const port = 3000;

/**
 * Event listener for HTTP server "error" event.
 * @param {object} error
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			debug(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			debug(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	debug(`Listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = server;
