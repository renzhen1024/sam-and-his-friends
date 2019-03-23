const express = require('express');

const { createPosts } = include('data/post');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	const posts = createPosts(3);
	res.render('index', { posts });
});

module.exports = router;
