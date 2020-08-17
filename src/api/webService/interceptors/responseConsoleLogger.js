/*eslint no-console: 0*/

function responseConsoleLogger(config) {
	try {
		console.log('%c Request Success:', 'color: #4CAF50; font-weight: bold', config);
		if (config && config.data && config.data.status < 0) {
			throw new Error(config.data.msg);
		}
	} catch (error) {
		console.log('%c Request Error:', 'color: #EC6060; font-weight: bold', error, config);
	}
	return config;
}

function responseConsoleErrorLogger(err) {
	try {
		console.log('%c Request Error:', 'color: #EC6060; font-weight: bold', err);
	} catch (error) {
		//suppress
	}
	return Promise.reject(err);
}

export default responseConsoleLogger;
export { responseConsoleLogger, responseConsoleErrorLogger };
