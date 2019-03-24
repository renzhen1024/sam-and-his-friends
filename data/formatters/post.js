const config = include('config');

function singlePostFormatter(post) {
	return {
		name: '小山',
		content: post.raw,
		date: post.updated_at,
		reads: post.reads,
		authorImageUrl:
			'https://renzhen1024.com/user_avatar/renzhen1024.com/mountainsun1988/240/90_2.png',
	};
}

function postFormatter(post) {
	return {
		id: post.id,
		title: post.title,
		subTitle: post.fancy_title || '这张帖子没有副标题',
		date: post.bumped_at,
		name: '小山',
		authorImageUrl:
			'https://renzhen1024.com/user_avatar/renzhen1024.com/mountainsun1988/240/90_2.png',
		content: post.excerpt || '内容被山姆哥藏起来了，点击“继续阅读”',
		category: '山姆哥',
		numLikes: post.like_count,
		numComments: post.posts_count,
		isReaderMode: config.isReaderMode,
	};
}

function postsFormatter({ data = {} } = {}) {
	const { topics } = data.topic_list;
	return topics.map(topic => postFormatter(topic));
}

exports.postFormatter = postFormatter;
exports.postsFormatter = postsFormatter;
exports.singlePostFormatter = singlePostFormatter;
