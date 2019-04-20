/**
 * @module utils/formatters/active-users-formatter
 */

const { API } = include('utils/config');

/**
 * Format a user
 * @param {object} user - User data returns from API
 * @returns {object} Formatted user
 */
function activeUserFormatter(user) {
	const username = `@${user.username}`;
	const userImageUrl = `${API}${user.avatar_template
		.replace('{size}', '240')
		.replace('/', '')}`;
	const userProfileUrl = `${API}u/${user.username}/summary`;

	const formattedUser = Object.assign({}, user, {
		username,
		userImageUrl,
		userProfileUrl,
	});

	delete formattedUser.avatar_template;

	return formattedUser;
}

/**
 * Format array of users from API data for rendering
 * @param {array} users - Array of users
 * @returns {array} Formatted users array
 */
exports.activeUsersFormatter = function activeUsersFormatter(users) {
	return users.map(user => activeUserFormatter(user));
};
