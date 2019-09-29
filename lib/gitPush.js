
'use strict'

const shell = require('shelljs');
const { argv } = require('yargs');

// git info
const gitInfo = {
  user: shell.exec('`which git` config --list | grep "user.name"').split('=')[1].split('\n')[0],
  branch: shell.exec('`which git` branch | `which grep` "*"').stdout.split(' ')[1].split('\n')[0],
}


function gitMessageBuilder() {
  const { user, branch } = gitInfo;
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

// gulp task
function commitAndPush(done) {
  const { branch } = gitInfo;
  let gitJob = `\`which git\` add .`;
  gitJob += ` && \`which git\` commit --message "${gitMessageBuilder()}"`;
  gitJob += ` && \`which git\` push -u github ${branch}`;
  // gitJob += ` && \`which git\` push -u heroku ${branch}`;
  shell.exec(gitJob);
  done();
}

module.exports = commitAndPush;
