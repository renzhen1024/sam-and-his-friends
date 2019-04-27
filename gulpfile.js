const { src, dest, series } = require('gulp');

const gulpClean = require('gulp-clean');
const sass = require('gulp-sass');
const minify = require('gulp-cssnano');
const md5 = require('gulp-md5-plus');

const SASS_SOURCE_SOURCE = 'public/assets/sass/*.scss';
const SASS_SOURCE_OUTPUT = 'public/assets/sass/output';
const HBS_LAYOUT_SOURCE = 'views/templates/layout/*.hbs';
const HBS_LAYOUT_OUTPUT = 'views/templates/layout-fingerprinted';

function clean() {
	return src([SASS_SOURCE_OUTPUT, HBS_LAYOUT_OUTPUT]).pipe(gulpClean());
}

function html() {
	return src(HBS_LAYOUT_SOURCE).pipe(dest(HBS_LAYOUT_OUTPUT));
}

function css() {
	return src(SASS_SOURCE_SOURCE)
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
		.pipe(dest(SASS_SOURCE_OUTPUT));
}

exports.default = series(clean, html, css);
