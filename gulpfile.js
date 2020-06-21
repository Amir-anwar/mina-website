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


// Pathes here
const pathes = {
  styles: {
    src: 'scss/**/*.scss',
    dest: 'css/',
  },
};

function css() {
  return (
    gulp
        .src(pathes.styles.src)
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}))
        .on('error', sass.logError)
        .pipe(gulp.dest(pathes.styles.dest))
        .pipe(rename({ suffix: '.min'}))
        .pipe(postcss([autoprefixer(), cssnano()]))
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
