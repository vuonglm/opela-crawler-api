require('@babel/register')({});

const webpack = require('webpack');
const devConfig = require('./webpack/server.dev.js');
let httpServer;
// detect "development" environment
const DEV_ENV = (process.env.NODE_ENV === 'development');


const startServer = () => {
	if (DEV_ENV) {
		httpServer = require('./server/server');
	} else {
		httpServer = require('./buildServer/main').default;
	}
	httpServer.start();
};

if (DEV_ENV) {
	webpack(devConfig).run( (err) => {
		if (err) {
			return;
		}
		startServer();
	});
} else {
	startServer();
}
