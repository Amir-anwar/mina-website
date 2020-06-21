/* eslint-disable require-jsdoc */
'use strict';

// Load plugins
const gulp = require('gulp');
const sass = require('gulp-sass');


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
        .pipe(sass({outputStyle: 'expanded'}))
        .on('error', sass.logError)
        .pipe(gulp.dest(pathes.styles.dest))
  );
}

function watch() {
  gulp.watch(pathes.styles.src, css);
}

// export tasks
exports.css = css;
exports.watch = watch;
