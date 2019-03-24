const config = include('config');

function postFormatter({ data = {} } = {}) {
	const { topics } = data.topic_list;
	return topics.map(topic => ({
		id: topic.id,
		title: topic.title,
		subTitle: topic.fancy_title || '这张帖子没有副标题',
		date: topic.bumped_at,
		name: '小山',
		authorImageUrl:
			'https://renzhen1024.com/user_avatar/renzhen1024.com/mountainsun1988/240/90_2.png',
		content: topic.excerpt || '内容被山姆哥藏起来了，点击“继续阅读”',
		category: '山姆哥',
		numLikes: topic.like_count,
		numComments: topic.posts_count,
		isReaderMode: config.isReaderMode,
	}));
}

exports.postFormatter = postFormatter;
