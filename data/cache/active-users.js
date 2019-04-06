// A list of users, key is user id
const activeUsers = {};

function addActiveUserToCache(user) {
	if (!activeUsers[user.id]) {
		activeUsers[user.id] = user;
	}
}

/**
 * Add active user to local cache, input can be either a single active user or
 * an array of active users
 */
function addActiveUsersToCache(users) {
	if (Array.isArray(users)) {
		users.forEach(user => addActiveUserToCache(user));
	} else {
		addActiveUserToCache(users);
	}
}

/**
 * Get an active user by user id
 */
function getActiveUserFromCache(id) {
	return activeUsers[id];
}

exports.addActiveUsersToCache = addActiveUsersToCache;
exports.getActiveUserFromCache = getActiveUserFromCache;
