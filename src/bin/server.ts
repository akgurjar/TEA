import { app } from '../app';
import { Server } from 'http';
import * as Debug from 'debug';
import { environment, Console } from '../utils';
const debug = Debug('tea-app:server');



/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(environment.PORT || '3000');
app.instance.set('port', port);

/**
 * Create HTTP server.
 */

const server: Server = new Server(app.instance);

/**
 * Listen on provided port, on all network interfaces.
 */
app.init().then(() => {
	server.listen(port, () => {
		Console.info(`Listening on port ${port}`);
	});
})
server.on('error', onError);
server.on('listening', onListening);


// function serverHandler(req: IncomingMessage, res: ServerResponse){
// 	res.end("Hello from server");
// }




/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		console.error(bind + ' is already in use');
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
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}
