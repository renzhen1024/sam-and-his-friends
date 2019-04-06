function miniPostFormatter(miniPost) {
	return {
		id: miniPost.topic_id,
		title: miniPost.title,
		date: miniPost.created_at,
		content: miniPost.excerpt,
	};
}

function miniPostsFormatter(miniPosts) {
	return miniPosts.map(miniPost => miniPostFormatter(miniPost));
}

exports.miniPostsFormatter = miniPostsFormatter;
