const fakerZh = require('faker-zh-cn');
const faker = require('faker');

const config = include('config');

function createPost() {
	return {
		id: faker.random.number(),
		title: fakerZh.Name.findName(),
		fancy_title: fakerZh.Name.findName(),
		slug: faker.lorem.word(),
		posts_count: faker.random.number(),
		reply_count: faker.random.number(),
		highest_post_number: faker.random.number(),
		image_url: Math.random() > 0.5 ? faker.image.image() : null,
		created_at: faker.date.past(),
		last_posted_at: null,
		bumped: true,
		bumped_at: faker.date.past(),
		excerpt: fakerZh.Lorem.paragraphs(),
		like_count: faker.random.number(),
		unseen: false,
		last_read_post_number: 1,
		unread: 0,
		new_posts: 0,
		pinned: true,
		unpinned: null,
		visible: true,
		closed: false,
		archived: false,
		notification_level: 1,
		bookmarked: false,
		liked: false,
		views: 2,
		has_summary: false,
		archetype: 'regular',
		last_poster_username: 'Jack',
		category_id: 7,
		pinned_globally: false,
		featured_link: null,
		isReaderMode: config.isReaderMode,
	};
}

function createPosts(num) {
	const topics = new Array(num).fill(1).map(() => createPost());
	return {
		data: {
			topic_list: {
				topics,
			},
		},
	};
}

exports.createPost = createPost;
exports.createPosts = createPosts;
