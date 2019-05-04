exports.mockUsers = [
	{
		id: 9,
		username: 'Vivian',
		name: '',
		avatar_template: '/user_avatar/renzhen1024.com/vivian/240/40_2.png',
		title: '',
	},
	{
		id: 6,
		username: 'mountainsun1988',
		name: '小山',
		avatar_template:
			'/user_avatar/renzhen1024.com/mountainsun1988/240/40_2.png',
		title: '',
	},
	{
		id: 4,
		username: 'tningjs',
		name: 'Tao Ning',
		avatar_template: '/user_avatar/renzhen1024.com/tningjs/240/14_2.png',
		title: '山姆哥和他的小伙伴们',
	},
];

const formattedUsers = [
	{
		id: 9,
		name: '',
		title: '',
		userImageUrl:
			'https://renzhen1024.com/user_avatar/renzhen1024.com/vivian/240/40_2.png',
		userProfileUrl: 'https://renzhen1024.com/u/Vivian/summary',
		username: '@Vivian',
	},
	{
		id: 6,
		name: '小山',
		title: '',
		userImageUrl:
			'https://renzhen1024.com/user_avatar/renzhen1024.com/mountainsun1988/240/40_2.png',
		userProfileUrl: 'https://renzhen1024.com/u/mountainsun1988/summary',
		username: '@mountainsun1988',
	},
	{
		id: 4,
		name: 'Tao Ning',
		title: '山姆哥和他的小伙伴们',
		userImageUrl:
			'https://renzhen1024.com/user_avatar/renzhen1024.com/tningjs/240/14_2.png',
		userProfileUrl: 'https://renzhen1024.com/u/tningjs/summary',
		username: '@tningjs',
	},
];

exports.mockComments = [
	{
		cooked:
			'\u003cp\u003e\u003cdiv Mollitia ut doloribus quis dolorem distinctio a.',
		updated_at: '2019-03-16T11:55:36.879Z',
		reads: 4,
		user_id: 4,
	},
	{
		cooked: '\u003cp\u003e Mollitia ut doloribus quis dolorem distinctio a',
		updated_at: '2019-03-17T04:43:32.303Z',
		reads: 4,
		user_id: 4,
	},
	{
		cooked: '',
		updated_at: '2019-03-27T14:12:37.676Z',
		reads: 2,
		user_id: 4,
	},
];

const formattedComments = [
	{
		authorImageUrl:
			'https://renzhen1024.com/user_avatar/renzhen1024.com/tningjs/240/14_2.png',
		content: '<p><div Mollitia ut doloribus quis dolorem distinctio a.',
		date: '2019-03-16T11:55:36.879Z',
		name: 'Tao Ning',
		reads: 4,
		userProfileUrl: 'https://renzhen1024.com/u/tningjs/summary',
	},
	{
		authorImageUrl:
			'https://renzhen1024.com/user_avatar/renzhen1024.com/tningjs/240/14_2.png',
		content: '<p> Mollitia ut doloribus quis dolorem distinctio a',
		date: '2019-03-17T04:43:32.303Z',
		name: 'Tao Ning',
		reads: 4,
		userProfileUrl: 'https://renzhen1024.com/u/tningjs/summary',
	},
];

exports.mockMiniPosts = [
	{
		excerpt: '',
		created_at: '2019-03-28T15:46:34.457Z',
		topic_id: 88,
		title: '这本世界上发行量最大的书，到底都讲了些什么？',
	},
	{
		excerpt:
			'Et voluptatibus quia voluptas magnam voluptatum necessitatibus. Dignissimos qui delectus. Voluptates doloremque autem sunt dolorem qui delectus sint tempore doloribus. Aspernatur veniam minima qui. Rerum eos nulla ipsum numquam fuga vel ut nihil nobis. Non magnam voluptas et voluptate illo laudantium rem.',
		created_at: '2019-03-15T03:15:10.304Z',
		topic_id: 66,
		title: '全新的理念，全新的市场，“无知”的用户，如何找到真实需求',
	},
	{
		excerpt:
			'Quaerat totam eum minus rerum qui minus. Veniam consequuntur neque molestiae soluta sed adipisci iste. Nemo veniam quia pariatur temporibus eum libero. Suscipit non modi distinctio omnis et. Dolores officia reiciendis pariatur.',
		created_at: '2019-03-15T03:11:33.185Z',
		topic_id: 72,
		title: '对你人生影响最大的三本书',
	},
];

const formattedMiniPosts = [
	{
		content:
			'Et voluptatibus quia voluptas magnam voluptatum necessitatibus. Dignissimos qui delectus. Voluptates doloremque autem sunt dolorem qui delectus sint tempore doloribus. Aspernatur veniam minima qui. Rerum eos nulla ipsum numquam fuga vel ut nihil nobis. Non magnam voluptas et voluptate illo laudantium rem.',
		date: '2019-03-15T03:15:10.304Z',
		id: 66,
		title: '全新的理念，全新的市场，“无知”的用户，如何找到真实需求',
	},
	{
		content:
			'Quaerat totam eum minus rerum qui minus. Veniam consequuntur neque molestiae soluta sed adipisci iste. Nemo veniam quia pariatur temporibus eum libero. Suscipit non modi distinctio omnis et. Dolores officia reiciendis pariatur.',
		date: '2019-03-15T03:11:33.185Z',
		id: 72,
		title: '对你人生影响最大的三本书',
	},
];

exports.mockPost = {
	post_stream: {
		posts: [
			{
				id: 142,
				name: 'Tao Ning',
				username: 'tningjs',
				avatar_template: '/user_avatar/renzhen1024.com/tningjs/240/90_2.png',
				created_at: '2019-03-04T14:53:22.217Z',
				cooked:
					'Perferendis et iusto dolor. Facere sequi et voluptate est nulla officiis.',
				post_number: 1,
				updated_at: '2019-03-04T14:53:22.217Z',
				reads: 6,
				topic_id: 56,
				topic_slug: 'topic',
				display_username: 'Tao Ning',
				version: 1,
				can_edit: true,
				can_delete: false,
				can_recover: null,
				can_wiki: true,
				read: true,
				user_title: '山姆哥和他的小伙伴们',
				user_id: 4,
			},
			{
				cooked:
					'Sunt sed quod enim non aut. Non ipsum adipisci quasi laboriosam doloremque. Et quia suscipit et esse nemo omnis eos voluptatibus. Ex a quia suscipit aut accusamus. Voluptatem non reiciendis aliquid ullam at quisquam. Officiis consequatur commodi aut porro.',
				updated_at: '2019-03-05T01:28:24.208Z',
				reads: 6,
				user_id: 4,
			},
			{
				cooked:
					'Natus aut eum tenetur. Qui qui quos numquam ullam ea expedita. Repudiandae quia accusamus eum id neque ratione quo nemo. Non consequatur quisquam cum. Recusandae cumque velit quas distinctio nobis eius accusamus.',
				updated_at: '2019-03-05T05:26:00.216Z',
				reads: 6,
				user_id: 4,
			},
			{
				cooked: 'consequatur-fugiat-tempora',
				updated_at: '2019-03-05T05:49:08.467Z',
				reads: 6,
				user_id: 4,
			},
		],
	},
	title: '为什么我们吃着最好吃的饭，却体质不如人？',
	views: 47,
	like_count: 1,
	reply_count: 3,
	posts_count: 2,
	details: {
		created_by: {
			id: 4,
			username: 'tningjs',
			name: 'Tao Ning',
			avatar_template: '/user_avatar/renzhen1024.com/tningjs/240/14_2.png',
		},
	},
};

const formattedPost = {
	authorImageUrl:
		'https://renzhen1024.com/user_avatar/renzhen1024.com/tningjs/240/14_2.png',
	comments: [
		{
			authorImageUrl:
				'https://renzhen1024.com/user_avatar/renzhen1024.com/tningjs/240/14_2.png',
			content:
				'Sunt sed quod enim non aut. Non ipsum adipisci quasi laboriosam doloremque. Et quia suscipit et esse nemo omnis eos voluptatibus. Ex a quia suscipit aut accusamus. Voluptatem non reiciendis aliquid ullam at quisquam. Officiis consequatur commodi aut porro.',
			date: '2019-03-05T01:28:24.208Z',
			name: 'Tao Ning',
			reads: 6,
			userProfileUrl: 'https://renzhen1024.com/u/tningjs/summary',
		},
		{
			authorImageUrl:
				'https://renzhen1024.com/user_avatar/renzhen1024.com/tningjs/240/14_2.png',
			content:
				'Natus aut eum tenetur. Qui qui quos numquam ullam ea expedita. Repudiandae quia accusamus eum id neque ratione quo nemo. Non consequatur quisquam cum. Recusandae cumque velit quas distinctio nobis eius accusamus.',
			date: '2019-03-05T05:26:00.216Z',
			name: 'Tao Ning',
			reads: 6,
			userProfileUrl: 'https://renzhen1024.com/u/tningjs/summary',
		},
		{
			authorImageUrl:
				'https://renzhen1024.com/user_avatar/renzhen1024.com/tningjs/240/14_2.png',
			content: 'consequatur-fugiat-tempora',
			date: '2019-03-05T05:49:08.467Z',
			name: 'Tao Ning',
			reads: 6,
			userProfileUrl: 'https://renzhen1024.com/u/tningjs/summary',
		},
	],
	content:
		'Perferendis et iusto dolor. Facere sequi et voluptate est nulla officiis.',
	date: '2019-03-04T14:53:22.217Z',
	isPosterSiteOwner: false,
	name: 'Tao Ning',
	numComments: 5,
	numLikes: 1,
	reads: 6,
	tags: undefined,
	title: '为什么我们吃着最好吃的饭，却体质不如人？',
	userProfileUrl: 'https://renzhen1024.com/u/tningjs/summary',
	views: 47,
};

exports.formattedUsers = formattedUsers;
exports.formattedComments = formattedComments;
exports.formattedMiniPosts = formattedMiniPosts;
exports.formattedPost = formattedPost;

exports.mockDataMap = {
	formattedUsers,
	formattedComments,
	formattedMiniPosts,
	formattedPost,
};
