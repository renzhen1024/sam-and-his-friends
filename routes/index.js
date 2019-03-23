const express = require('express');

const { createPosts } = include('data/post');
const { createMiniPosts } = include('data/mini-post');
const config = include('config');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	const posts = createPosts(3);
	const miniPosts = createMiniPosts(4);
	const postList = createMiniPosts(6);
	res.render('index', { posts, miniPosts, postList, config });
});

module.exports = router;
