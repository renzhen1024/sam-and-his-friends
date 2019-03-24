const express = require('express');
const axios = require('axios');

const { singlePostFormatter } = include('data/formatters/post');
const config = include('config');

const router = express.Router();

/* GET home page. */
router.get('/:topicId', (req, res) => {
	axios
		.get(`https://renzhen1024.com/t/${req.params.topicId}.json`)
		.then(({ data } = {}) => {
			const postId = data.post_stream.posts[0].id;
			const { title } = data;
			axios
				.get(`https://renzhen1024.com/posts/${postId}.json`)
				.then(response => {
					const post = singlePostFormatter(response.data);
					res.render('singlePost', {
						...post,
						title,
						config,
						isSinglePost: true,
					});
				});
		});
});

module.exports = router;
