/* eslint-disable require-jsdoc */
'use strict';

// Load plugins
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './',
    },
    port: 3000,
  });
  done();
}


// BrowserSync Reload
function reload(done) {
  browsersync.reload();
  done();
}

// Pathes here
const pathes = {
  styles: {
    src: 'scss/**/*.scss',
    dest: 'css/',
    maps: 'maps',
  },
  scripts: {
    src: 'js/**/*.js',
  },
  pages: {
    src: '*.html',
  },
};

function css() {
  return (
    gulp
        .src(pathes.styles.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        // .on('error', sass.logError)
        .pipe(gulp.dest(pathes.styles.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write(pathes.styles.maps))
        .pipe(gulp.dest(pathes.styles.dest))
        .pipe(browsersync.stream())
  );
}

function watch() {
  css();

  gulp.watch(pathes.styles.src, gulp.series(css, reload));
  gulp.watch(pathes.pages.src, reload);
  gulp.watch(pathes.scripts.src, reload);
}

// export tasks
exports.css = css;
exports.watch = gulp.parallel(watch, browserSync);
