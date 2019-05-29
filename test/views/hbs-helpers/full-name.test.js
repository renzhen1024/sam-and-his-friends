const { fullName } = require('../../../src/views/hbs-helpers/full-name');

describe('Views | HBS Helpers | full-name', () => {
	test('It should get full name', () => {
		expect(fullName('Americo', 'Nolan')).toEqual('Nolan Americo');
		expect(fullName('Dortha', 'Kulas')).toEqual('Kulas Dortha');

		expect(fullName('Americo', 'Nolan', 'Jerad')).toEqual('Nolan Americo');
		expect(fullName('Dortha', '')).toEqual('Dortha');
		expect(fullName('', 'Kulas')).toEqual('Kulas');
	});
});
