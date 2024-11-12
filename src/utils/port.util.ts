export function normalize(port: string) {
	const val: number = parseInt(port, 10);

	if (isNaN(val)) {
		// named pipe
		return port;
	}

	if (val >= 0) {
		// port number
		return val;
	}

	return false;
}
