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

// Images
const imagemin = require('gulp-imagemin');

const { isPro } = require('./src/utils/isPro');
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

const HBS_LAYOUT_SOURCE = 'src/views/templates/layout/*.hbs';
const HBS_LAYOUT_OUTPUT = 'src/views/templates/layout-fingerprinted';
const ASSETS_OUTPUT = 'output';

function clean() {
	return del([ASSETS_OUTPUT, HBS_LAYOUT_OUTPUT]);
}

function html() {
	return src(HBS_LAYOUT_SOURCE)
		.pipe(header(BANNER.HTML, { package: packageInfo }))
		.pipe(dest(HBS_LAYOUT_OUTPUT));
}

// Need to keep js in order
const JS_SOURCE = [
	'src/public/assets/js/jquery.min.js',
	'src/public/assets/js/browser.min.js',
	'src/public/assets/js/breakpoints.min.js',
	'src/public/assets/js/util.js',
	'src/public/assets/js/main.js',
];
const JS_OUTPUT = 'output/assets/js';
function js() {
	return src(JS_SOURCE)
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(md5(10, `${HBS_LAYOUT_OUTPUT}/*.hbs`))
		.pipe(header(BANNER.JS, { package: packageInfo }))
		.pipe(dest(JS_OUTPUT));
}

const SASS_SOURCE = 'src/public/assets/sass/*.scss';
const SASS_OUTPUT = 'output/assets/sass';
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

const VENDORS_SOURCE = 'src/public/assets/vendors/**/*';
const VENDORS_OUTPUT = 'output/assets/vendors';
function vendors() {
	return src(VENDORS_SOURCE).pipe(dest(VENDORS_OUTPUT));
}

const IMAGES_SOURCE = 'src/public/images/**/*';
const IMAGES_OUTPUT = 'output/images';
function image() {
	// disable imagemin in develop because this plugin slow down build time for 6s
	return isPro()
		? src(IMAGES_SOURCE)
				.pipe(imagemin())
				.pipe(dest(IMAGES_OUTPUT))
		: src(IMAGES_SOURCE).pipe(dest(IMAGES_OUTPUT));
}

exports.default = series(clean, html, js, css, vendors, image);
