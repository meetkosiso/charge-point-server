import { v4 as uuidv4 } from 'uuid';
import { requestValidator } from '../services/validateRequest';
import { validatePayload } from '../services/validatePayload';
import { notificationProcessor } from '../services/notification';

export function bootNotifier(payload, logger) {
	const requiredPayload = {
		chargePointVendor: '',
		chargePointModel: '',
	};

	const notified = notificationProcessor(
		payload,
		logger,
		'BootNotification',
		requiredPayload,
		requestValidator,
		validatePayload,
		uuidv4
	);

	return notified;
}
