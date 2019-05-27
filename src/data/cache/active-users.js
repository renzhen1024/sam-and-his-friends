/**
 * @module data/cache/active-users
 * A cache implementation use redis as client
 * TODO: refactor cache/single-post.js and cache/active-users.js into one fiel
 */
const debug = require('debug')('sam-and-his-friends:cache:active-user');
const redis = require('redis');
const { promisify } = require('util');

const { REDIS_CONFIG } = require('../../utils/constants.js');
const redisMock = require('../../test/test-helpers/redis-mock');

const isTest = process.env.NODE_ENV === 'test';
const client = isTest ? redisMock.createClient() : redis.createClient();
const promisified = {
	hset: isTest ? client.hset : promisify(client.hset).bind(client),
	hget: isTest ? client.hget : promisify(client.hget).bind(client),
};

client.on('error', err => {
	debug(`Error ${err}`);
});

client.on('ready', () => {
	debug(`Ready`);
});

client.on('connect', () => {
	debug(`Connect`);
});

/**
 * Add the user to cache
 * @param {object} user - User object get from API
 */
function addActiveUserToCache(user) {
	return promisified.hset(
		REDIS_CONFIG.HASHSET_NAME,
		`${REDIS_CONFIG.KEY_PREFIX.ACTIVE_USER}:${user.id}`,
		JSON.stringify(user)
	);
}

/**
 * Add user to cache, input can be either a single user or array of users
 * @param {(array|object)} users - Users or a single user get from API
 * @public
 */
exports.addActiveUsersToCache = function addActiveUsersToCache(users) {
	if (Array.isArray(users)) {
		return Promise.all(users.map(user => addActiveUserToCache(user)));
	}

	return addActiveUserToCache(users);
};

/**
 * Get an active user by user id
 * @param {number} id - User id
 * @returns {object} user
 * @public
 */
exports.getActiveUserFromCache = function getActiveUserFromCache(id) {
	return promisified
		.hget(
			REDIS_CONFIG.HASHSET_NAME,
			`${REDIS_CONFIG.KEY_PREFIX.ACTIVE_USER}:${id}`
		)
		.then(user => (user ? JSON.parse(user) : ''));
};
