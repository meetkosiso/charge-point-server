import { assert } from 'chai';
import logger from 'loglevel';

import { statusNotifier } from '../../src/statusNotification';

describe('Status Notification', () => {
	const payload = [
		2,
		'19223201',
		'StatusNotification',
		{ status: 'Faulted', errorCode: 'NoError', connectorId: 1 },
	];

	const invalidPayload = [
		3,
		'19223201',
		'StatusNotification',
		{ status: 'Faulted', errorCode: 'NoError', connectorId: 1 },
	];

	it('should return success response if payload is valid', (done) => {
		const notified = statusNotifier(payload, logger);

		const serialized = JSON.parse(notified);

		assert.equal(serialized[0], 3);
		done();
	});

	it('should return error response if payload is invalid', (done) => {
		const notified = statusNotifier(invalidPayload, logger);

		const serialized = JSON.parse(notified);

		assert.equal(serialized[0], 4);
		done();
	});
});
