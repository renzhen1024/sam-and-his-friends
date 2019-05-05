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
	username,
} = require('../utils/config');
const { addActiveUsersToCache } = require('../data/cache/active-users');
const {
	DISCOURSE_RESOURCE_MAP,
	NUMBER_OF_POSTS_IN_ONE_PAGE,
} = require('../utils/constants');

async function _getPosts(currentPage) {
	const postsReqParams = {
		resource: DISCOURSE_RESOURCE_MAP.CATEGORY_BY_USER,
		queryParams: {
			page: currentPage,
		},
	};

	const postsResponse = await request(postsReqParams);

	const formattedActiveUsers = activeUsersFormatter(postsResponse.data.users);

	await addActiveUsersToCache(formattedActiveUsers);

	return postsFormatter(postsResponse.data.topic_list.topics);
}

async function _getMiniPosts() {
	const miniPostsReqParams = {
		resource: DISCOURSE_RESOURCE_MAP.USER_ACTIONS,
		queryParams: {
			username,
			offset: 0,
			filter: 5, // discouse api doesn't take filter properly, the return payload may lager than 5
			no_results_help_key: 'user_activity.no_replies',
		},
	};

	const miniPostsResponse = await request(miniPostsReqParams);

	return miniPostsFormatter(miniPostsResponse.data.user_actions);
}

async function _getActiveUsers() {
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

	await addActiveUsersToCache(formattedActiveUsers);

	return formattedActiveUsers.slice(0, lengthOfActiveUsersAtIndexPage);
}

/**
 * Index router
 * @param {object} router - router object init from express.Router
 * @returns router middleware
 */
module.exports = (router = new Router()) => {
	router.get('/', async (req, res) => {
		const { currentPage = 0 } = req.query;

		const posts = await _getPosts(currentPage);
		const miniPosts = await _getMiniPosts();
		const activeUsersList = await _getActiveUsers();

		const previouPage = Math.max(currentPage - 1, 0);
		const nextPage =
			posts.length < NUMBER_OF_POSTS_IN_ONE_PAGE ? 0 : currentPage + 1;

		res.render('index', {
			posts,
			miniPosts,
			activeUsersList,
			previouPage,
			nextPage,
			about,
			creator,
			siteTitle,
			socialMedias,
		});
	});

	return router;
};
