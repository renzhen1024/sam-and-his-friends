const express = require('express');

const { createPosts } = include('data/mocks/post');
const { createMiniPosts } = include('data/mocks/mini-post');
const { postsFormatter, miniPostsFormatter } = include('data/formatters/post');
const { request } = include('data/requests/request');
const config = include('config');

const { API_REQUEST_TYPE, CATEGORY_ID, NUMBER_OF_POSTS_IN_ONE_PAGE } = include(
	'utils/constants'
);

const router = express.Router();

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
		const postsReqParams = {
			id: CATEGORY_ID,
			page: currentPage,
		};

		const postsResponse = await request(
			API_REQUEST_TYPE.CATEGORY,
			postsReqParams
		);
		posts = postsFormatter(postsResponse.data.topic_list.topics);

		const miniPostsReqParams = {
			id: 'user_actions',
			offset: 0,
			filter: 5, // discouse api doesn't take filter properly, the return payload may lager than 5
			username: CATEGORY_ID,
			no_results_help_key: 'user_activity.no_replies',
		};
		const miniPostsResponse = await request(
			API_REQUEST_TYPE.MINI_POST,
			miniPostsReqParams
		);
		miniPosts = miniPostsFormatter(miniPostsResponse.data.user_actions);
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
