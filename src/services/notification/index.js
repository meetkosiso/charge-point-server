export function notificationProcessor(
	payload,
	logger,
	action,
	requiredPayload,
	requestValidator,
	validatePayload,
	uuidv4
) {
	const validated = requestValidator(
		payload,
		action,
		validatePayload,
		requiredPayload
	);

	let messageID;

	if (validated.success === false) {
		messageID = uuidv4();

		const error = JSON.stringify([
			4,
			messageID,
			validated.error,
			validated.description,
			{},
		]);

		return error;
	}

	logger.info(`${action}:`, payload);

	messageID = payload[1];

	const success = JSON.stringify([
		3,
		messageID,
		{
			status: 'Accepted',
			action,
			currentTime: new Date().toISOString(),
		},
	]);

	return success;
}
