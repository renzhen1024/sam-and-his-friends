/**
 * @module src/views/hbs-helpers/date-formatter
 */
const hbs = require('hbs');
const moment = require('moment');
const { setting } = require('../../utils/config');

moment.locale(setting.locale || (navigator && navigator.locale[0]));

/**
 * Format date
 * @param {string} date - date string in the milliseconds format
 */
function dateFormatter(date) {
	return moment(date).format('LL');
}

hbs.registerHelper('dateFormatter', dateFormatter);

exports.dateFormatter = dateFormatter;
