const { getActiveUserFromCache } = include('data/cache/active-users');

function singlePostFormatter(postData) {
	const poster = getActiveUserFromCache(postData.details.created_by.id);

	const { title, views, like_count: numLikes } = postData;
	const numComments = postData.posts_count + postData.reply_count;
	const post = postData.post_stream.posts[0];

	return {
		title,
		views,
		numLikes,
		numComments,
		name: poster.name,
		content: post.cooked,
		date: post.updated_at,
		reads: post.reads,
		authorImageUrl: poster.userImageUrl,
	};
}

exports.singlePostFormatter = singlePostFormatter;
