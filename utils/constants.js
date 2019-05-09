const { rootCategory, username } = require('../utils/config');

/**
 * Discourse API: https://docs.discourse.org/
 * - ACTIVE_USERS
 * 		- Sample url: https://renzhen1024.com/directory_items.json?period=monthly
 * 		- Description: Get a list of active users
 * - CATEGORY
 * 		- Sample url:
 * 			- https://renzhen1024.com/c/7-category.json
 * 			- https://renzhen1024.com/c/7-category/%E6%96%87%E5%8C%96%E9%80%BB%E8%BE%91.json (/文化逻辑 before url encoding)
 * 		- Description: Get a list of topics created by category, the top most category will have catetory id and subcategory will followed with category name in the url
 * TOPIC
 * 		- Sample url: https://renzhen1024.com/t/76.json
 *    - Description: Get a single topic. Notice needs to create a function,
 * 			because topicId is decided at run time
 * USER_ACTIONS
 * 		- Sample url: https://renzhen1024.com/user_actions.json?offset=0&username=sambro&filter=5&no_results_help_key=user_activity.no_replies&_=1553724992603
 * 		- Description: Get a list of posts created by user name
 */
exports.DISCOURSE_RESOURCE_MAP = {
	ACTIVE_USERS: 'directory_items',
	CATEGORY_BY_USER: `topics/created-by/${username}`,
	CATEGORY(subcategory) {
		const commonPath = `c/${rootCategory}`;
		return subcategory ? `${commonPath}/${encodeURI(subcategory)}` : commonPath;
	},
	TOPIC(topicId) {
		return `t/${topicId}`;
	},
	USER_ACTIONS: 'user_actions',
};

exports.NUMBER_OF_POSTS_IN_ONE_PAGE = 30;

/**
 * Currently, the design is store everyting into one hashset. One entity is map
 * to a field of the hashset:
 * Redis-cli: HSET sam-and-his-friends active-user:user.id JSON.stringify(user)
 */
exports.REDIS_CONFIG = {
	HASHSET_NAME: 'sam-and-his-friends',
	KEY_PREFIX: {
		ACTIVE_USER: 'active-user',
		SINGLE_POST: 'single-post',
	},
};
