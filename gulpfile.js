/**
 * Inspired from: [gulp-boilerplate/gulpfile.js](https://github.com/cferdinandi/gulp-boilerplate/blob/master/gulpfile.js)
 */
const { src, dest, series } = require('gulp');

const del = require('del');
const header = require('gulp-header');

// Scripts
const concat = require('gulp-concat');
const uglify = require('gulp-terser');

// Styles
const sass = require('gulp-sass');
const minify = require('gulp-cssnano');
const md5 = require('gulp-md5-plus');

const packageInfo = require('./package.json');

// Template for banner to add to file headers
const HEADER = `
 Name: ${packageInfo.name} v${packageInfo.version}
 Description: ${packageInfo.description}
 Copyright: (c) ${new Date().getFullYear()} ${packageInfo.author.name}
 License: ${packageInfo.license}
 ${packageInfo.repository.url}
 `;

const BANNER = {
	HTML: `<!--${HEADER}-->\n\n`,
	JS: `/*******************${HEADER}*******************/\n\n`,
	CSS: `/*******************${HEADER}*******************/\n\n`,
};

const JS_SOURCE = [
	'public/assets/js/jquery.min.js',
	'public/assets/js/browser.min.js',
	'public/assets/js/breakpoints.min.js',
	'public/assets/js/util.js',
	'public/assets/js/main.js',
];
const JS_OUTPUT = 'public/assets/js/output';
const SASS_SOURCE = 'public/assets/sass/*.scss';
const SASS_OUTPUT = 'public/assets/sass/output';
const HBS_LAYOUT_SOURCE = 'views/templates/layout/*.hbs';
const HBS_LAYOUT_OUTPUT = 'views/templates/layout-fingerprinted';

function clean() {
	return del([JS_OUTPUT, SASS_OUTPUT, HBS_LAYOUT_OUTPUT]);
}

function html() {
	return src(HBS_LAYOUT_SOURCE)
		.pipe(header(BANNER.HTML, { package: packageInfo }))
		.pipe(dest(HBS_LAYOUT_OUTPUT));
}

function js() {
	return src(JS_SOURCE)
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(md5(10, `${HBS_LAYOUT_OUTPUT}/*.hbs`))
		.pipe(header(BANNER.JS, { package: packageInfo }))
		.pipe(dest(JS_OUTPUT));
}

function css() {
	return src(SASS_SOURCE)
		.pipe(
			sass({
				outputStyle: 'expanded',
				sourceComments: true,
			})
		)
		.pipe(
			minify({
				discardComments: {
					removeAll: true,
				},
			})
		)
		.pipe(md5(10, `${HBS_LAYOUT_OUTPUT}/*.hbs`))
		.pipe(header(BANNER.CSS, { package: packageInfo }))
		.pipe(dest(SASS_OUTPUT));
}

exports.default = series(clean, html, js, css);
