/**
 * @module src/views/hbs-helpers/eq
 */
const hbs = require('hbs');

/**
 * Compare two nmbers, to see if those two numbers are equal
 * @param {number} num
 * @param {number} cmp
 * @returns {boolean}
 */
function eq(num, cmp) {
	return num === cmp;
}

hbs.registerHelper('eq', eq);

exports.eq = eq;
