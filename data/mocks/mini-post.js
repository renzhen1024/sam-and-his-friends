const fakerZh = require('faker-zh-cn');
const faker = require('faker');

const config = include('config');

function createMiniPost() {
	return {
		title: fakerZh.Name.findName(),
		date: faker.date.past(),
		authorImageUrl: faker.image.avatar(),
		imageUrl: faker.image.image(),
		originPost: faker.internet.url(),
		isReaderMode: config.isReaderMode,
	};
}

function createMiniPosts(num) {
	return new Array(num).fill(1).map(() => createMiniPost());
}

exports.createMiniPost = createMiniPost;
exports.createMiniPosts = createMiniPosts;
