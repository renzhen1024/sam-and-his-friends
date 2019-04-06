const express = require('express');

const { createPosts } = include('data/mocks/post');
const { createMiniPosts } = include('data/mocks/mini-post');
const { postsFormatter } = include('data/formatters/post');
const { miniPostsFormatter } = include('data/formatters/mini-posts-formatter');
const { request } = include('data/requests/request');
const config = include('utils/config');
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
		resource: DISCOURSE_RESOURCE_MAP.USER_ACTIONS,
		offset: 0,
		filter: 5, // discouse api doesn't take filter properly, the return payload may lager than 5
		username: config.userName,
		no_results_help_key: 'user_activity.no_replies',
	};

	const miniPostsResponse = await request(miniPostsReqParams);

	return miniPostsFormatter(miniPostsResponse.data.user_actions);
}

router.get('/', async (req, res) => {
	let posts;
	let miniPosts;
	let postList;

	if (process.env.IS_TEST) {
		// TODO: This is a temp solution, it's better to mock API
		const response = createPosts(3);
		posts = postsFormatter(response);

		miniPosts = createMiniPosts(4);
		postList = createMiniPosts(6);
		res.render('index', { posts, miniPosts, postList, config });
	} else {
		const { currentPage = 0 } = req.query;
		posts = await _getPosts(currentPage);
		miniPosts = await _getMiniPosts();
		postList = createMiniPosts(6);

		const previouPage = Math.max(currentPage - 1, 0);
		const nextPage =
			posts.length < NUMBER_OF_POSTS_IN_ONE_PAGE ? 0 : currentPage + 1;

		res.render('index', {
			posts,
			miniPosts,
			postList,
			previouPage,
			nextPage,
			...config,
		});
	}
});

module.exports = router;
