#!/usr/bin/env node

/**
 * Module dependencies.
 */
const debug = require('debug')('sam-and-his-friends:server');
const https = require('https');
const fs = require('fs');

const app = require('./app');

// set up ssl
const key = fs.readFileSync(absPath('encryption/private.key'));
const cert = fs.readFileSync(absPath('encryption/samandhisfriends_com.crt'));
const ca = fs.readFileSync(absPath('encryption/samandhisfriends_com.ca'));

const options = { key, cert, ca };

const server = https.createServer(options, app());

const port = 443;

/**
 * Event listener for HTTP server "error" event.
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

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
