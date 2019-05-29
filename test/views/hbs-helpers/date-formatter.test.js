const {
	dateFormatter,
} = require('../../../src/views/hbs-helpers/date-formatter');

describe('Views | HBS Helpers | date-formatter', () => {
	test('It should format date correctly', () => {
		expect(dateFormatter(0)).toEqual('1969年12月31日');
		expect(dateFormatter(818035920000)).toEqual('1995年12月3日');
		expect(dateFormatter(1556556090000)).toEqual('2019年4月29日');
		expect(dateFormatter(1559158805221)).toEqual('2019年5月29日');
	});
});
