exports.API = 'https://renzhen1024.com/';

exports.about =
	'重庆大学车辆工程学士，美国匹兹堡大学工业工程硕士。PMP项目管理专业人士资格认证；AUTODESK INVENTOR三维设计专业认证。个人公众号《山姆哥和他的小伙伴们》- 公众号ID：UncleSamChina';

const description = '一个赴美建厂&自动化改造的亲历者';
exports.description = description;
exports.creator = {
	description,
	firstName: '',
	lastName: '北美山姆哥',
	profileImage: 'images/sam-site-profile-image.png',
};

exports.metaDescription = '一个赴美建厂&自动化改造的亲历者';

exports.lengthOfActiveUsersAtIndexPage = 5;

const siteTitle = '北美山姆哥';
exports.siteTitle = siteTitle;

exports.socialMedias = [
	{ name: 'Facebook', className: 'facebook', url: 'http://facebook.com' },
	{ name: 'Twitter', className: 'twitter', url: 'http://twitter.com' },
	{
		name: 'Instagram',
		className: 'instagram',
		url: 'https://www.instagram.com',
	},
	{ name: 'RSS', className: 'rss', url: 'https://rss.com/' },
	{
		name: 'Email',
		className: 'envelope',
		url: 'mailto:mountainsun1988@gmail.com',
	},
];

exports.username = 'sambro';

exports.rootCategory = '7-category';

exports.subCategories = [
	{ name: '文化逻辑', description: '关于文化逻辑的分类' },
	{ name: '管理制度', description: '关于管理制度的分类' },
	{ name: '器物科技', description: '关于器物科技的分类' },
	{ name: '案例分享', description: '关于案例分享的分类' },
];

exports.categories = {
	5: [
		{
			name: '热点讨论',
			color: '#0088CC',
		},
	],
	7: [
		{
			name: '山姆哥',
			color: '#8C6238;',
			link: `/`,
		},
	],
	8: [
		{
			name: '文化逻辑',
			color: '#F9623B',
			link: `/?subcategory=${encodeURI('文化逻辑')}`,
		},
	],
	9: [
		{
			name: '管理制度',
			color: '#25AAE2',
			link: `/?subcategory=${encodeURI('管理制度')}`,
		},
	],
	10: [
		{
			name: '器物科技',
			color: '#9EB83B',
			link: `/?subcategory=${encodeURI('器物科技')}`,
		},
	],
	11: [
		{
			name: '案例分享',
			color: '#3AB54A',
			link: `/?subcategory=${encodeURI('案例分享')}`,
		},
	],
};

const defalutMetaTagImageSrcStr =
	'https://samandhisfriends.com/images/post-og-image.jpg';

const fbCommonMetaTags = [
	{
		type: 'og:locale',
		content: 'zh-CN',
	},
	{
		type: 'fb:app_id',
		content: '381747502434242',
	},
];

exports.fbWebsiteMetaTags = [
	{ type: 'og:url', content: 'https://samandhisfriends.com' },
	{
		type: 'og:type',
		content: 'website',
	},
	{ type: 'og:title', content: siteTitle },
	{
		type: 'og:description',
		content: description,
	},
	{
		type: 'og:image',
		content: defalutMetaTagImageSrcStr,
	},
	...fbCommonMetaTags,
];

const twitterCommonMetaTags = [
	{
		type: 'twitter:card',
		content: 'summary_large_image',
	},
	{
		type: 'twitter:site',
		content: '@renzhen1024',
	},
	{
		type: 'twitter:creator',
		content: '@renzhen1024',
	},
];

exports.twitterWebsiteMetaTags = [
	{
		type: 'twitter:title',
		content: siteTitle,
	},
	{
		type: 'twitter:description',
		content: description,
	},
	{
		type: 'twitter:image',
		content: defalutMetaTagImageSrcStr,
	},
	...twitterCommonMetaTags,
];

exports.defalutMetaTagImageSrcStr = defalutMetaTagImageSrcStr;
exports.fbCommonMetaTags = fbCommonMetaTags;
exports.twitterCommonMetaTags = twitterCommonMetaTags;
