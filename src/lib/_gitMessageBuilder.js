
'use strict'

const { argv } = require('yargs');
const gitInfo = require('./_gitInfo');

function gitMessageBuilder() {
  const { user, currentBranch } = gitInfo;
  let heading = '';
  if(argv.s) {
    heading = 'STABLE'
  } else if(argv.b) {
    heading = 'BROKEN'
  } else if(argv.f) {
    heading = 'FEATURE'
  } else if(argv.x) {
    heading = 'HOTFIX'
  } else if(argv.m) {
    heading = 'MESSAGE';
  } else {
    heading = 'AUTO-COMMIT';
  }

  let message = argv.m;

  if(!message || !(message.length > 0)) {
    message = 'no message for commit.';
  }
  return `[BRANCH: ${branch}] | [USER: ${user}] | ${heading} :: ${message}`;
}

module.exports = gitMessageBuilder;
