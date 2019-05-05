const { mockDataMap } = require('./mock-data');
const { REDIS_CONFIG } = require('../../utils/constants.js');

const MOCK_DATA_MAP = {
	[REDIS_CONFIG.KEY_PREFIX.ACTIVE_USER]: 'formattedUsers',
	[REDIS_CONFIG.KEY_PREFIX.SINGLE_POST]: 'formattedPosts',
};

module.exports = {
	createClient() {
		return {
			hset: () => Promise.resolve(),
			hget: (hashsetName, fieldName) => {
				if (hashsetName !== REDIS_CONFIG.HASHSET_NAME) {
					return Promise.resolve({});
				}

				const [keyPrefix, id] = fieldName.split(':');
				const keyInMockData = MOCK_DATA_MAP[keyPrefix];
				const mockData = mockDataMap[keyInMockData].find(
					item => item.id === Number.parseInt(id, 10)
				);

				return Promise.resolve(JSON.stringify(mockData));
			},
		};
	},
};
