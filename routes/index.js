const express = require('express');

const { createPosts } = include('data/mocks/post');
const { createMiniPosts } = include('data/mocks/mini-post');
const { postsFormatter } = include('data/formatters/post');
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
		const reqParams = {
			page: currentPage,
			id: CATEGORY_ID,
		};

		const response = await request(API_REQUEST_TYPE.CATEGORY, reqParams);
		posts = postsFormatter(response.data.topic_list.topics);
		miniPosts = createMiniPosts(4);
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
