export function validatePayload(payload, requiredPayload) {
	const requiredPayloadKey = Object.keys(requiredPayload);

	const size = requiredPayloadKey.length;

	for (let i = 0; i < size; i += 1) {
		const supportedPayload = payload[requiredPayloadKey[i]];

		if (supportedPayload === undefined) {
			return false;
		}
	}

	return true;
}
