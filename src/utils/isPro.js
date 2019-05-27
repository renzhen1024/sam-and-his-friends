/**
 * @module utils/isPro
 */

/**
 * @returns {boolean} check the env which is pass in from npm script
 */
exports.isPro = () => !process.env.DEBUG;
