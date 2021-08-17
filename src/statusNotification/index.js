import { v4 as uuidv4 } from 'uuid';
import { requestValidator } from '../services/validateRequest';
import { validatePayload } from '../services/validatePayload';
import { notificationProcessor } from '../services/notification';

export function statusNotifier(payload, logger) {
	const requiredPayload = { status: '', errorCode: '', connectorId: 1 };

	const notified = notificationProcessor(
		payload,
		logger,
		'StatusNotification',
		requiredPayload,
		requestValidator,
		validatePayload,
		uuidv4
	);

	return notified;
}
