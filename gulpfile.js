
'use strict'

const gulp = require('gulp');
const path = require('path');
const libGenerator = require('gulp-lib-generator');

const { PWD: ROOT_DIR } = process.env;

const libOptions = [{
  src: './src/lib/',
  dest: './src/',
  ignore: ['^_'],
}];

// tasks
gulp.task('lib', gulp.series(libGenerator(libOptions)));







//
