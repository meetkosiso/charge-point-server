import { assert } from 'chai';
import logger from 'loglevel';
import { bootNotifier } from '../../src/bootNotification';

describe('Boot Notification', () => {
	const payload = [
		2,
		'19223201',
		'BootNotification',
		{ chargePointVendor: 'VendorX', chargePointModel: 'SingleSocketCharger' },
	];

	const invalidPayload = [
		3,
		'19223201',
		'BootNotification',
		{ chargePointVendor: 'VendorX', chargePointModel: 'SingleSocketCharger' },
	];

	it('should return success response if payload is valid', (done) => {
		const notified = bootNotifier(payload, logger);

		const serialized = JSON.parse(notified);

		assert.equal(serialized[0], 3);
		done();
	});

	it('should return error response if payload is invalid', (done) => {
		const notified = bootNotifier(invalidPayload, logger);

		const serialized = JSON.parse(notified);

		assert.equal(serialized[0], 4);
		done();
	});
});
