'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var babelify = require('babelify'); // Used to convert ES6 & JSX to ES5
var browserify = require('browserify');
var watchify = require('watchify');
var errorify = require('errorify');
var rename = require('gulp-rename'); // Rename sources
var chalk = require('chalk'); // Allows for coloring for logging
var merge = require('utils-merge'); // Object merge tool
var duration = require('gulp-duration'); // Time aspects of your gulp process
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var moment = require('moment');
var browserSync = require('browser-sync');

var config = {
  js: {
    src: './src/main.jsx',
    outputDir: './public/',
    outputFile: 'main.js'
  }
}

function mapError(err) {
  if (err.fileName) {
    // Regular error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description));
  } else {
    // Browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}

// Completes the final file outputs
function bundle(bundler) {
  var bundleTimer = duration(moment().format('hh:mm:ss') + ': Bundle complete');

  return bundler
  .bundle()
  .on('error', mapError) // Map error reporting
  .pipe(source('main.jsx')) // Set source name
  .pipe(buffer()) // Convert to gulp pipeline
  .pipe(bundleTimer) // Output time timing of the file creation
  .pipe(rename(config.js.outputFile)) // Rename the output file
  .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
}

// Gulp task for build
gulp.task('babelify-dev', function() {
  var args = merge(watchify.args, { debug: true }); // Merge in default watchify args with browserify arguments

  var bundler = browserify(config.js.src, args) // Browserify
  .plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']}) // Watchify to watch source file changes
  .transform(babelify, {presets: ['es2015', 'react']}); // Babel tranforms

  bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)

  bundler.on('update', function() {
    bundle(bundler) // Re-run bundle on source updates
    .pipe(browserSync.stream());
  });

  browserSync({
    baseDir: "./public/",
    proxy: "localhost:3000",
    port: 5000,
    notify: true
  });
});

gulp.task('dev-less', function () {
  return gulp.src('./less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream())
});

gulp.task('watch-less', function() {
  gulp.watch('./**/*.less', ['dev-less']);  // Watch all the .less files, then run the less task
});

gulp.task('bundle-dev', ['babelify-dev', 'dev-less', 'watch-less']);


/*
 pseudo-demarcation between dev bundling and production bundling
*/

gulp.task('prod-less', function () {
  return gulp.src('./less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('babelify-prod', function() {
  var bundleTimer = duration('bundle time');
  var bundler = browserify(config.js.src) // Browserify
  .transform(babelify, {presets: ['es2015', 'react']}); // Babel transforms

  bundler
  .bundle()
  .on('error', mapError) // Map error reporting
  .pipe(source('main.jsx')) // Set source name
  .pipe(buffer()) // Convert to gulp pipeline
  .pipe(uglify())
  .pipe(bundleTimer)
  .pipe(rename(config.js.outputFile)) // Rename the output file
  .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
});

gulp.task('bundle-prod', ['babelify-prod','prod-less']);
