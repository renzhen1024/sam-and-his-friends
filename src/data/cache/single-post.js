/**
 * @module data/cache/single-post
 * A cache implementation use redis as client
 * TODO: refactor cache/single-post.js and cache/active-users.js into one fiel
 */
const debug = require('debug')('sam-and-his-friends:cache:single-post');
const redis = require('redis');
const { promisify } = require('util');

const { REDIS_CONFIG } = require('../../utils/constants.js');
const redisMock = require('../../../test/test-helpers/redis-mock');

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
 * Add a post to cache
 * @param {object} post - Post object get from API
 */
exports.addPostToCache = function addPostToCache(post) {
	return promisified.hset(
		REDIS_CONFIG.HASHSET_NAME,
		`${REDIS_CONFIG.KEY_PREFIX.SINGLE_POST}:${post.topic_id}`,
		JSON.stringify(post)
	);
};

/**
 * Get an post by post id
 * @param {number} id - post id
 * @returns {object} post
 * @public
 */
exports.getPostFromCache = function getPostFromCache(id) {
	return promisified
		.hget(
			REDIS_CONFIG.HASHSET_NAME,
			`${REDIS_CONFIG.KEY_PREFIX.SINGLE_POST}:${id}`
		)
		.then(post => (post ? JSON.parse(post) : ''));
};
