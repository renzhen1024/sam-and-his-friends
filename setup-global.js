/**
 * Use the function to setup absolute path in require
 * refer: https://coderwall.com/p/th6ssq/absolute-paths-require
 */
module.exports = function setupGlobal() {
	global.absPath = function absPath(path) {
		return `${__dirname}/${path}`;
	};

	global.include = function include(file) {
		// eslint-disable-next-line
		return require(absPath(`${file}`));
	};
};
