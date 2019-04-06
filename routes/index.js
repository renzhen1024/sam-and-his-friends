const express = require('express');

const { createPosts } = include('data/mocks/post');
const { createMiniPosts } = include('data/mocks/mini-post');
const { postsFormatter } = include('data/formatters/post');
const { miniPostsFormatter } = include('data/formatters/mini-posts-formatter');
const { activeUsersFormatter } = include(
	'data/formatters/active-users-formatter'
);
const { request } = include('data/requests/request');
const {
	about,
	creator,
	lengthOfActiveUsersAtIndexPage,
	siteTitle,
	socialMedias,
	username,
} = include('utils/config');
const { addActiveUsersToCache } = include('data/cache/active-users');
const { DISCOURSE_RESOURCE_MAP, NUMBER_OF_POSTS_IN_ONE_PAGE } = include(
	'utils/constants'
);

const router = express.Router();

async function _getPosts(currentPage) {
	const postsReqParams = {
		resource: DISCOURSE_RESOURCE_MAP.CATEGORY_BY_USER,
		page: currentPage,
	};

	const postsResponse = await request(postsReqParams);

	return postsFormatter(postsResponse.data.topic_list.topics);
}

async function _getMiniPosts() {
	const miniPostsReqParams = {
		username,
		resource: DISCOURSE_RESOURCE_MAP.USER_ACTIONS,
		offset: 0,
		filter: 5, // discouse api doesn't take filter properly, the return payload may lager than 5
		no_results_help_key: 'user_activity.no_replies',
	};

	const miniPostsResponse = await request(miniPostsReqParams);

	return miniPostsFormatter(miniPostsResponse.data.user_actions);
}

async function _getActiveUsers() {
	const activeUsersReqParams = {
		resource: DISCOURSE_RESOURCE_MAP.ACTIVE_USERS,
		period: 'monthly',
	};

	const activeUsersResponse = await request(activeUsersReqParams);

	const formattedActiveUsers = activeUsersFormatter(
		activeUsersResponse.data.directory_items
	);

	addActiveUsersToCache(formattedActiveUsers);

	return formattedActiveUsers.slice(0, lengthOfActiveUsersAtIndexPage);
}

router.get('/', async (req, res) => {
	let posts;
	let miniPosts;
	let activeUsersList;

	if (process.env.IS_TEST) {
		// Fix: will the adding of activeUsersList, this is out date now
		// TODO: This is a temp solution, it's better to mock API
		const response = createPosts(3);
		posts = postsFormatter(response);

		miniPosts = createMiniPosts(4);
		activeUsersList = createMiniPosts(6);
		res.render('index', { posts, miniPosts, activeUsersList });
	} else {
		const { currentPage = 0 } = req.query;
		posts = await _getPosts(currentPage);
		miniPosts = await _getMiniPosts();
		activeUsersList = await _getActiveUsers();

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
	}
});

module.exports = router;
