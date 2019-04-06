const { getActiveUserFromCache } = include('data/cache/active-users');

function _postFormatter(post) {
	// The first poster is the topic author
	const poster = getActiveUserFromCache(post.posters[0].user_id);
	return {
		id: post.id,
		title: post.title,
		date: post.created_at,
		name: poster.name,
		authorImageUrl: poster.userImageUrl,
		content: post.excerpt || '内容被山姆哥藏起来了，点击“继续阅读”',
		category: '山姆哥',
		numLikes: post.like_count,
		numComments: post.posts_count + post.reply_count,
		isReaderMode: false,
	};
}

function postsFormatter(topics) {
	return topics
		.map(topic => _postFormatter(topic))
		.sort((a, b) => b.date - a.date);
}

exports.postsFormatter = postsFormatter;
