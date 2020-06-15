import path from 'path';
import express from 'express';
import i18n from 'i18n';
import async from 'async';

import { initQueueServer } from './bullQueue';

const app = express();

i18n.configure({
    updateFiles: false,
    locales: ['en', 'jp'],
    defaultLocale: 'jp',
    directory: path.join(__dirname, '../locales/lang'),
    register: global,
    objectNotation: true
});
i18n.setLocale('jp');

const PORT = process.env.SERVER_PORT || 3000;
const API_ROLE = process.env.API_ROLE;

app.start = () => {
	const startHttp = (cb) => {
		app.listen(PORT, () => {
			cb();
		});
	};

	const startQueue = (cb) => {
		initQueueServer(cb);
	};

	const methods = {
		http: startHttp,
		queue: startQueue
	}
	switch (API_ROLE) {
		case 'http':
			delete methods.queue;
			break;
		case 'queue':
			delete methods.http;
			break;
	}
	async.parallel(methods, (err) => {
		if (err) {
			throw err;
			return;
		}
		if (methods.http) {
			console.log(`Server is running on ${PORT} ...`);
			app.started = true;
			app.emit('started');
		}
		if (methods.queue) {
			console.log('*** Queue server is running ...');
		}
	});
}

export default app;
