/* eslint-disable require-jsdoc */
'use strict';

// Load plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');


// Pathes here
const pathes = {
  styles: {
    src: 'scss/**/*.scss',
    dest: 'css/',
    maps: 'maps',
  },
};

function css() {
  return (
    gulp
        .src(pathes.styles.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .on('error', sass.logError)
        .pipe(gulp.dest(pathes.styles.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write(pathes.styles.maps))
        .pipe(gulp.dest(pathes.styles.dest))
  );
}

function watch() {
  css();

  gulp.watch(pathes.styles.src, css);
}

// export tasks
exports.css = css;
exports.watch = watch;
