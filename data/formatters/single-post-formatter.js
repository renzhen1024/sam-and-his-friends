/**
 * Hard code string is not good, the response only has a user id, so need to send
 * anther request to get the name and authorImageUrl. Since only Sam will post
 * in this category, so use hard code string as a compromise solution.
 */
function singlePostFormatter(postData) {
	const { title, views, like_count: numLikes } = postData;
	const numComments = postData.posts_count + postData.reply_count;
	const post = postData.post_stream.posts[0];

	return {
		title,
		views,
		numLikes,
		numComments,
		name: '小山',
		content: post.cooked,
		date: post.updated_at,
		reads: post.reads,
		authorImageUrl:
			'https://renzhen1024.com/user_avatar/renzhen1024.com/mountainsun1988/240/90_2.png',
	};
}

exports.singlePostFormatter = singlePostFormatter;
