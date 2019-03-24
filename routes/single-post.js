const express = require('express');

const { singlePostFormatter } = include('data/formatters/post');
const { request } = include('data/request');
const config = include('config');
const { API_REQUEST_TYPE } = include('utils/constants');

const router = express.Router();

router.get('/:topicId', (req, res) => {
	request(API_REQUEST_TYPE.TOPIC, req.params.topicId).then(({ data } = {}) => {
		const postId = data.post_stream.posts[0].id;
		const { title } = data;
		request(API_REQUEST_TYPE.POST, postId).then(response => {
			const post = singlePostFormatter(response.data);
			res.render('singlePost', {
				...post,
				...config,
				title,
				isSinglePost: true,
			});
		});
	});
});

module.exports = router;
