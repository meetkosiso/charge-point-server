import { assert } from 'chai';
import { requestValidator } from '../../src/services/validateRequest';
import { validatePayload } from '../../src/services/validatePayload';

describe('Request Validation', () => {
	const callObject = [
		2,
		'19223201',
		'BootNotification',
		{ chargePointVendor: 'VendorX', chargePointModel: 'SingleSocketCharger' },
	];

	const invalidPayload = [
		2,
		'19223201',
		'BootNotification',
		{ chargePointModel: 'SingleSocketCharger' },
	];

	const requiredPayload = {
		chargePointVendor: '',
		chargePointModel: '',
	};

	const invalidMessageType = [
		3,
		'19223201',
		'BootNotification',
		{ chargePointVendor: 'VendorX', chargePointModel: 'SingleSocketCharger' },
	];

	const invalidActionCall = [
		2,
		'19223201',
		'Notifier',
		{ chargePointVendor: 'VendorX', chargePointModel: 'SingleSocketCharger' },
	];

	const invalidMessageID = [
		3,
		'1922320199499394939493949394993949394939439439',
		'Notifier',
		{ chargePointVendor: 'VendorX', chargePointModel: 'SingleSocketCharger' },
	];

	it('should fail if message type is not valid', (done) => {
		const validated = requestValidator(
			invalidMessageType,
			'BootNotification',
			validatePayload,
			requiredPayload
		);
		assert.equal(validated.success, false);
		done();
	});

	it('should fail if action call is not valid', (done) => {
		const validated = requestValidator(
			invalidActionCall,
			'BootNotification',
			validatePayload,
			requiredPayload
		);
		assert.equal(validated.success, false);
		done();
	});

	it('should fail if message id is not valid', (done) => {
		const validated = requestValidator(
			invalidMessageID,
			'BootNotification',
			validatePayload,
			requiredPayload
		);
		assert.equal(validated.success, false);
		done();
	});

	it('should fail if payload is not valid', (done) => {
		const validated = requestValidator(
			invalidPayload,
			'BootNotification',
			validatePayload,
			requiredPayload
		);
		assert.equal(validated.success, false);
		done();
	});

	it('should succeed if call Object is valid', (done) => {
		const validated = requestValidator(
			callObject,
			'BootNotification',
			validatePayload,
			requiredPayload
		);
		assert.equal(validated.success, true);
		done();
	});

	it('should fail if required payload are not available', (done) => {
		const validated = validatePayload(invalidPayload[3], requiredPayload);
		assert.equal(validated, false);
		done();
	});

	it('should succeed if required payload are  available', (done) => {
		const validated = validatePayload(callObject[3], requiredPayload);
		assert.equal(validated, true);
		done();
	});
});
