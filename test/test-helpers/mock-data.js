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

const formattedPosts = [
	{
		id: 329,
		name: '小山',
		username: 'mountainsun1988',
		avatar_template:
			'/user_avatar/renzhen1024.com/mountainsun1988/240/90_2.png',
		created_at: '2019-04-17T18:53:25.800Z',
		cooked:
			'\u003cp\u003e最近刚刚了解到R\u0026amp;D， Designer和engineer工作定位是不一样的，至少在机械制造业是有区别的，简单来说，就如同建筑行业里，分别对应的 建筑画家、建筑设计师和土木工程师。\u003c/p\u003e\n\u003cp\u003eR\u0026amp;D，全称是research and development。一般属于比较前沿的研究，跟学校里的研究单位有点接近。都是对未来行业的一些探索，不以商业利益为主要目标。从事这样的职位，可以接触到最前沿的理念，也有对本行业很宽阔的视野。缺点是，对于企业往往都是锦上添花，所以遇到危机时，会优先裁掉。\u003c/p\u003e\n\u003cp\u003eDesigner，在制造领域的设计师，更多是针对市场上的具体需求，或者是潜在需求，应用已经相对成熟的技术，来设计出满足这一需求的方案。同时兼顾用户体验、生产成本、安装组装制造可行性等等。\u003c/p\u003e\n\u003cp\u003e而对于Engineer，定义要广泛的多。虽然很多企业Engineer跟designer工作范围是有些重合的，但两者的工作范围还是很容易区分的开的。或者说designer可以叫做engineer，但并不是每个engineer都可以design的。\u003c/p\u003e\n\u003cp\u003e个人作为机械工程师的体验是，所做过的project可以分为两类，一类是工作内容相对确定，比如安装一台冷却机，从layout到utility供给，从选型到估价，从安装到调试，其实每一步都相对确定，需要的只是去实施，在这中间会遇到各种各样的技术挑战。这类工程师的工作，更多的是协调和管理；但另一类是完全不确定的项目，更接近从一个概念变为现实，需要自己在市面上找所需要的零件和成熟的技术，最终做成成品，这个过程需要不断地推倒重来，变更设计，范围不确定，成本不确定，时间也会常常变动，往往需要分期来推进。\u003c/p\u003e\n\u003cp\u003e不知道大家怎么看？我个人观点是，如果喜欢理论研究，或者怀有纯粹的技术理想，就去R\u0026amp;D部门或者高效，搞偏理论的前沿研究。如果喜欢动手应用和发明实用的创造，就做designer；如果是喜欢跟人打交道，喜欢协调资源，可以做更接近生产和客户的engineer。\u003c/p\u003e',
		ignored: false,
		post_number: 1,
		post_type: 1,
		updated_at: '2019-04-17T19:21:23.536Z',
		reply_count: 0,
		reply_to_post_number: null,
		quote_count: 0,
		avg_time: 44,
		incoming_link_count: 0,
		reads: 3,
		score: 47.8,
		yours: false,
		topic_id: 125,
		topic_slug: 'topic',
		display_username: '小山',
		primary_group_name: null,
		primary_group_flair_url: null,
		primary_group_flair_bg_color: null,
		primary_group_flair_color: null,
		version: 2,
		can_edit: true,
		can_delete: false,
		can_recover: null,
		can_wiki: true,
		read: true,
		user_title: '山姆哥和他的小伙伴们',
		actions_summary: [
			{ id: 2, count: 1, acted: true },
			{ id: 3, can_act: true },
			{ id: 4, can_act: true },
			{ id: 8, can_act: true },
			{ id: 6, can_act: true },
			{ id: 7, can_act: true },
		],
		moderator: true,
		admin: false,
		staff: true,
		user_id: 6,
		hidden: false,
		trust_level: 3,
		deleted_at: null,
		user_deleted: false,
		edit_reason: null,
		can_view_edit_history: true,
		wiki: false,
	},
	{
		id: 330,
		name: '小山',
		username: 'mountainsun1988',
		avatar_template:
			'/user_avatar/renzhen1024.com/mountainsun1988/240/90_2.png',
		created_at: '2019-04-17T18:54:56.944Z',
		cooked: '',
		ignored: false,
		post_number: 2,
		post_type: 3,
		updated_at: '2019-04-17T18:54:56.944Z',
		reply_count: 0,
		reply_to_post_number: null,
		quote_count: 0,
		avg_time: 44,
		incoming_link_count: 0,
		reads: 3,
		score: 2.8,
		yours: false,
		topic_id: 125,
		topic_slug: 'topic',
		display_username: '小山',
		primary_group_name: null,
		primary_group_flair_url: null,
		primary_group_flair_bg_color: null,
		primary_group_flair_color: null,
		version: 1,
		can_edit: true,
		can_delete: true,
		can_recover: null,
		can_wiki: true,
		read: true,
		user_title: '山姆哥和他的小伙伴们',
		actions_summary: [
			{ id: 2, can_act: true },
			{ id: 3, can_act: true },
			{ id: 4, can_act: true },
			{ id: 8, can_act: true },
			{ id: 6, can_act: true },
			{ id: 7, can_act: true },
		],
		moderator: true,
		admin: false,
		staff: true,
		user_id: 6,
		hidden: false,
		trust_level: 3,
		deleted_at: null,
		user_deleted: false,
		edit_reason: null,
		can_view_edit_history: true,
		wiki: false,
		action_code: 'pinned.enabled',
	},
	{
		id: 331,
		name: 'Tao Ning',
		username: 'tningjs',
		avatar_template: '/user_avatar/renzhen1024.com/tningjs/240/14_2.png',
		created_at: '2019-04-18T19:42:35.539Z',
		cooked:
			'\u003cp\u003e在互联网行业也有这三个不同的职位，但是R\u0026amp;D的意义很广泛，一般从事产品开发的都属于R\u0026amp;D（其他部门还有HR，Sales，Marketing）。\u003c/p\u003e\n\u003cp\u003e一般的工作流程是：由Project Manger来确定应该做什么feature\u003cbr\u003e\n，Designer设计feature如何展现，包括图标、页面以及用户的交互等，Engineer则负责通过代码实现Desiner的设计。另外，团队一般还有Data Scientist，他们通过用户交互后产生的数据去决定这个feature是否成功，提出改进建议等。由于一个团队一般由6到10位Engineer，所以还有一个专职的Engineering Mananger来做管理工作。\u003c/p\u003e',
		ignored: false,
		post_number: 3,
		post_type: 1,
		updated_at: '2019-04-18T19:42:35.539Z',
		reply_count: 0,
		reply_to_post_number: null,
		quote_count: 0,
		avg_time: null,
		incoming_link_count: 0,
		reads: 2,
		score: 0.4,
		yours: true,
		topic_id: 125,
		topic_slug: 'topic',
		display_username: 'Tao Ning',
		primary_group_name: null,
		primary_group_flair_url: null,
		primary_group_flair_bg_color: null,
		primary_group_flair_color: null,
		version: 1,
		can_edit: true,
		can_delete: true,
		can_recover: null,
		can_wiki: true,
		read: true,
		user_title: '',
		actions_summary: [
			{ id: 3, can_act: true },
			{ id: 4, can_act: true },
			{ id: 8, can_act: true },
			{ id: 7, can_act: true },
		],
		moderator: true,
		admin: false,
		staff: true,
		user_id: 4,
		hidden: false,
		trust_level: 2,
		deleted_at: null,
		user_deleted: false,
		edit_reason: null,
		can_view_edit_history: true,
		wiki: false,
	},
];

exports.formattedUsers = formattedUsers;
exports.formattedComments = formattedComments;
exports.formattedMiniPosts = formattedMiniPosts;
exports.formattedPost = formattedPost;
exports.formattedPosts = formattedPosts;

exports.mockDataMap = {
	formattedPosts,
	formattedUsers,
	formattedComments,
	formattedMiniPosts,
	formattedPost,
};
