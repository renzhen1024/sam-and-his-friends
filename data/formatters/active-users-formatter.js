const config = include('utils/config');

function activeUserFormatter({ user } = {}) {
	const username = `@${user.username}`;
	const userImageUrl = `${config.api}${user.avatar_template
		.replace('{size}', '240')
		.replace('/', '')}`;
	const userProfileUrl = `${config.api}u/${user.username}/summary`;

	const formattedUser = Object.assign({}, user, {
		username,
		userImageUrl,
		userProfileUrl,
	});

	delete formattedUser.avatar_template;

	return formattedUser;
}

function activeUsersFormatter(users) {
	return users.map(user => activeUserFormatter(user));
}

exports.activeUsersFormatter = activeUsersFormatter;
