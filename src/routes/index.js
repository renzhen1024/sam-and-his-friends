/**
 * @module routes/index
 */
const { Router } = require('express');

const {
	activeUsersFormatter,
} = require('../utils/formatters/active-users-formatter');
const {
	miniPostsFormatter,
} = require('../utils/formatters/mini-posts-formatter');
const { postsFormatter } = require('../utils/formatters/posts-formatter');
const { request } = require('../data/request');
const {
	about,
	creator,
	lengthOfActiveUsersAtIndexPage,
	siteTitle,
	socialMedias,
	subCategories,
	metaDescription,
	description,
	username,
	fbMetaTagsForIndexRoute,
	twitterMetaTagsForIndexRoute,
} = require('../utils/config');
const { addActiveUsersToCache } = require('../data/cache/active-users');
const { DISCOURSE_RESOURCE_MAP } = require('../utils/constants');

/**
 * Index route
 * @param {object} router - router object init from express.Router
 * @returns router middleware
 */
module.exports = (router = new Router()) => {
	router.get('/', async (req, res) => {
		const { currentPage = 0, subcategory = '' } = req.query;

		// data for posts componnt
		const postsResponse = await getPosts(currentPage, subcategory);
		const posts = await postsFormatter(postsResponse.data.topic_list.topics);
		await addUsersToCache(postsResponse.data.users);

		// data for mini posts componnt
		const miniPosts = await getMiniPosts();

		// data for active users componnt
		const activeUsersList = await getActiveUsers();

		// Discourse API has 30 topics per page, if it return 30 means there maybe more post
		const NUMBER_OF_POSTS_IN_ONE_PAGE = 30;
		const previouPage = Math.max(currentPage - 1, 0);
		const nextPage =
			posts.length === NUMBER_OF_POSTS_IN_ONE_PAGE ? currentPage + 1 : 0;

		res.render('index', {
			about,
			activeUsersList,
			creator,
			metaDescription,
			miniPosts,
			nextPage,
			posts,
			previouPage,
			socialMedias,
			subCategories,
			metaTags: [...fbMetaTagsForIndexRoute, ...twitterMetaTagsForIndexRoute],
			siteTitle: `${siteTitle} | ${description}`,
		});
	});

	return router;
};

/**
 * Get post payload from API
 * The API request contains 2 query params `currentPage` and `subcategory` which is passed in as params in this method
 * @param {number} currentPage
 * @param {string} subcategory
 * @returns {object} origin post(postsResponse)
 */
async function getPosts(currentPage, subcategory) {
	const postsReqParams = {
		resource: DISCOURSE_RESOURCE_MAP.CATEGORY(subcategory),
		queryParams: {
			page: currentPage,
		},
	};

	const postsResponse = await request(postsReqParams);

	return postsResponse;
}

/**
 * Get mini post palyload from API, format it.
 * @returns {object} formatted mini post
 */
async function getMiniPosts() {
	const FILTER_FOR_REPLY = 5;
	const miniPostsReqParams = {
		resource: DISCOURSE_RESOURCE_MAP.USER_ACTIONS,
		queryParams: {
			username,
			offset: 0,
			filter: FILTER_FOR_REPLY,
			no_results_help_key: 'user_activity.no_replies',
		},
	};

	const miniPostsResponse = await request(miniPostsReqParams);

	return miniPostsFormatter(miniPostsResponse.data.user_actions);
}

/**
 * Get active users, add to cache, also format it and returns the default number of them
 * @returns The default number of formatted active users
 */
async function getActiveUsers() {
	const activeUsersReqParams = {
		resource: DISCOURSE_RESOURCE_MAP.ACTIVE_USERS,
		queryParams: {
			period: 'monthly',
		},
	};

	const activeUsersResponse = await request(activeUsersReqParams);

	const activeUsers = activeUsersResponse.data.directory_items.map(
		userObj => userObj.user
	);

	const formattedActiveUsers = activeUsersFormatter(activeUsers);

	await addUsersToCache(activeUsers);

	return formattedActiveUsers.slice(0, lengthOfActiveUsersAtIndexPage);
}

/**
 * Add formatted user to cache
 * @param {object} activeUsers - Formatted users
 * @returns a promise that will resolve if add to cache success
 */
async function addUsersToCache(activeUsers) {
	const formattedActiveUsers = activeUsersFormatter(activeUsers);

	await addActiveUsersToCache(formattedActiveUsers);
}
