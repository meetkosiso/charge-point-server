export function requestValidator(
	request,
	method,
	validatePayload,
	requiredPayload
) {
	const messageType = request[0];
	const action = request[2];
	const messageID = request[1];
	const payload = request[3];

	if (messageType !== 2) {
		return {
			success: false,
			error: 'PropertyConstraintViolation',
			description: 'The message type is not recognised',
		};
	}

	if (action !== method) {
		return {
			success: false,
			error: 'NotSupported',
			description:
				'Requested Action is recognized but not supported by the receiver',
		};
	}

	if (messageID.length > 36) {
		return {
			success: false,
			error: 'PropertyConstraintViolation',
			description:
				'Payload is syntactically correct but at least one field contains an invalid value',
		};
	}

	if (validatePayload(payload, requiredPayload) === false) {
		return {
			success: false,
			error: 'ProtocolError',
			description: 'Payload for Action is incomplete',
		};
	}

	return { success: true, error: null, description: null };
}
