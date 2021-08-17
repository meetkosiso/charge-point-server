export function authenticate(payload, stations) {
	const [station, password] = payload.split(':');

	const index = stations.findIndex((i) => i.name === station);

	if (index === -1) {
		return { success: false, station: '' };
	}

	if (stations[index].password !== password) {
		return { success: false, station: '' };
	}

	return { success: true, station };
}
