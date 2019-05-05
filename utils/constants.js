const { username } = require('../utils/config');

/**
 * Discourse API: https://docs.discourse.org/
 * - ACTIVE_USERS
 * 		- Sample url: https://renzhen1024.com/directory_items.json?period=monthly
 * 		- Description: Get a list of active users
 * - CATEGORY_BY_USER
 * 		- Sample url: https://renzhen1024.com/topics/created-by/mountainsun1988.json?page=0&_=1553724992605
 * 		- Description: Get a list of topics created by user name, by convention
 * 			with renzhen1024.com this app take topics(first post) as article. If you
 * 			can't understand this point, talk to me @tningjs.
 * 			TODO: add docs about how topics works as article
 * TOPIC
 * 		- Sample url: https://renzhen1024.com/t/76.json
 *    - Description: Get a single topic. Notice needs to create a function,
 * 			because topicId is decided at run time
 * USER_ACTIONS
 * 		- Sample url: https://renzhen1024.com/user_actions.json?offset=0&username=mountainsun1988&filter=5&no_results_help_key=user_activity.no_replies&_=1553724992603
 * 		- Description: Get a list of posts created by user name
 */
exports.DISCOURSE_RESOURCE_MAP = {
	ACTIVE_USERS: 'directory_items',
	CATEGORY_BY_USER: `topics/created-by/${username}`,
	TOPIC: topicId => `t/${topicId}`,
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
