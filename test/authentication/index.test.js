import { assert } from 'chai';
import { authenticate } from '../../src/services/authentication';
import stations from '../../src/services/stations.json';

describe('Authentication', () => {
	const credentials = 'STATION-02:testing-01';
	const wrongCredentials = 'STATION-02:testing-06';

	it('should authenticate a request successfully', (done) => {
		const authenticated = authenticate(credentials, stations);
		assert.equal(authenticated.success, true);
		done();
	});

	it('should fail if the credentials are wrong', (done) => {
		const authenticated = authenticate(wrongCredentials, stations);
		assert.equal(authenticated.success, false);
		done();
	});
});
