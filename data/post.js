const fakerZh = require('faker-zh-cn');
const faker = require('faker');

module.exports = {
	title: fakerZh.Name.findName(),
	subTitle: fakerZh.Lorem.sentences(),
	date: faker.date.past(),
	firstName: fakerZh.Name.firstName(),
	lastName: fakerZh.Name.lastName(),
	authorImageUrl: faker.image.avatar(),
	imageUrl: faker.image.image(),
	content: fakerZh.Lorem.paragraphs(),
	category: fakerZh.Name.findName(),
	numLikes: faker.random.number(),
	numComments: faker.random.number(),
};
