const express = require('express');

const { createPosts } = include('data/mocks/post');
const { createMiniPosts } = include('data/mocks/mini-post');
const { postsFormatter } = include('data/formatters/post');
const { request } = include('data/requests/request');
const config = include('config');

const { API_REQUEST_TYPE, CATEGORY_ID } = include('utils/constants');

const router = express.Router();

router.get('/', (req, res) => {
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
		request(API_REQUEST_TYPE.CATEGORY, CATEGORY_ID).then(response => {
			posts = postsFormatter(response);
			miniPosts = createMiniPosts(4);
			postList = createMiniPosts(6);
			res.render('index', { posts, miniPosts, postList, ...config });
		});
	}
});

module.exports = router;
