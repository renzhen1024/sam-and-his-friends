/**
 * @module data/cache/active-users
 * A super basic cache implementation
 */

/**
 * A list of users, key is user id
 * @type {object}
 */
let activeUsers = {};

/**
 * Add the user to cache
 * @param {object} user - User object get from API
 */
async function addActiveUserToCache(user) {
	if (!activeUsers[user.id]) {
		activeUsers[user.id] = user;
	}
}

/**
 * Add user to local cache, input can be either a single user or array of users
 * @param {(array|object)} users - Users or a single user get from API
 * @public
 */
exports.addActiveUsersToCache = async function addActiveUsersToCache(users) {
	if (Array.isArray(users)) {
		await users.map(user => addActiveUserToCache(user));
	}

	await addActiveUserToCache(users);
};

/**
 * Get an active user by user id
 * @param {number} id - User id
 * @returns {object} user
 * @public
 */
exports.getActiveUserFromCache = function getActiveUserFromCache(id) {
	return Promise.resolve(activeUsers[id]);
};

/**
 * Clean local cache
 */
exports.cleanCache = async function cleanCache() {
	activeUsers = {};
};
