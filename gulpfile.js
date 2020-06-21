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
        .pipe(gulp.dest(pathes.styles.dest))
  );
}

// export tasks
exports.css = css;
