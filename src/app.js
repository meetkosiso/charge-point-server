import { createServer } from 'http';
import WebSocket from 'ws';
import dotenv from 'dotenv';
import logger from 'loglevel';
import { v4 as uuidv4 } from 'uuid';

import { authenticate } from './services/authentication';
import stations from './services/stations.json';
import { bootNotifier } from './bootNotification';
import { statusNotifier } from './statusNotification';

dotenv.config();

const server = createServer();

const wss = new WebSocket.Server({
	verifyClient: (info, done) => {
		const auth = info.req.headers.authorization;
		const token = auth.split(' ')[1];

		const station = Buffer.from(token, 'base64').toString('ascii');

		const authenticated = authenticate(station, stations);

		done(authenticated.success);
	},

	server,
});

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		const serialized = JSON.parse(message);

		const action = serialized[2];

		if (action === 'BootNotification') {
			const response = bootNotifier(serialized, logger);
			ws.send(response);
			return;
		}

		if (action === 'StatusNotification') {
			const response = statusNotifier(serialized, logger);
			ws.send(response);
			return;
		}

		ws.send(
			JSON.stringify([
				4,
				uuidv4(),
				'NotSupported',
				'Requested Action is recognized but not supported by the receiver',
				{},
			])
		);
	});
});

server.listen(process.env.PORT, () =>
	logger.warn(`listening on PORT ${process.env.PORT}`)
);
