import { Server } from 'http';

import { normalize } from '../utils/port.util.js';
import { app } from '../app/app.js';

app.set('PORT', normalize(process.env.PORT));

const server = new Server(app);

server.on('listening', () => {
	const addr = server.address();
	if (addr) {
		const bind =
			typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
		console.info('Listening on ' + bind);
	}
});

server.on('error', (error: any) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const port = app.get('PORT');
	const bind: any = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
		// break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
		// break;
		default:
			throw error;
	}
});

server.listen(app.get('PORT'), () => {
	console.info(`Server Listening on port <${app.get('PORT')}>`);
});
