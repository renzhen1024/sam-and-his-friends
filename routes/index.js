const express = require('express');
const axios = require('axios');

const { createPosts } = include('data/mocks/post');
const { createMiniPosts } = include('data/mocks/mini-post');
const { postFormatter } = include('data/formatters/post');
const config = include('config');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	let posts;
	let miniPosts;
	let postList;

	if (process.env.IS_TEST) {
		posts = createPosts(3);
		miniPosts = createMiniPosts(4);
		postList = createMiniPosts(6);
		res.render('index', { posts, miniPosts, postList, config });
	} else {
		axios.get('https://renzhen1024.com/c/7.json').then(response => {
			posts = postFormatter(response);
			miniPosts = createMiniPosts(4);
			postList = createMiniPosts(6);
			res.render('index', { posts, miniPosts, postList, config });
		});
	}
});

module.exports = router;
