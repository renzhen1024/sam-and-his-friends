/**
 * @module src/views/hbs-helpers/full-name
 */
const hbs = require('hbs');
const { setting } = require('../../utils/config');

/**
 * Get full name
 * If user only pass in one param, trim the space
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string}
 */
function fullName(firstName, lastName) {
	return setting.familyNameFirst
		? `${lastName} ${firstName}`.trim()
		: `${firstName} ${lastName}`.trim();
}

hbs.registerHelper('fullName', fullName);

exports.fullName = fullName;
