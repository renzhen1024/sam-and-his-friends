const fakerZh = require('faker-zh-cn');
const faker = require('faker');

const config = include('config');

function createPost() {
	return {
		title: fakerZh.Name.findName(),
		subTitle: fakerZh.Lorem.paragraph(),
		date: faker.date.past(),
		firstName: fakerZh.Name.firstName(),
		lastName: fakerZh.Name.lastName(),
		authorImageUrl: faker.image.avatar(),
		imageUrl: faker.image.image(),
		content: fakerZh.Lorem.paragraphs(),
		category: fakerZh.Name.findName(),
		numLikes: faker.random.number(),
		numComments: faker.random.number(),
		isReaderMode: config.isReaderMode,
	};
}

function createPosts(num) {
	return new Array(num).fill(1).map(() => createPost());
}

exports.createPost = createPost;
exports.createPosts = createPosts;
