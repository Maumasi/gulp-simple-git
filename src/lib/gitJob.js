
'use strict'

const shell = require('shelljs');
const { argv } = require('yargs');
const gitMessageBuilder = require('./_gitMessageBuilder');
const gitInfo = require('./_gitInfo');

// gulp task
function gitJob(done) {
  const { branch } = gitInfo;

  let gitJob = '';
  if(argv.a) {
    gitJob += `\`which git\` add .`;
  }
  if(argv.c) {
    gitJob += ` && \`which git\` commit --message "${gitMessageBuilder()}"`;
  }
  if(argv.p) {
    gitJob += ` && \`which git\` push -u ${argv.remote || 'origin'} ${argv.branch || branch}`;
  }
  // let gitJob = `\`which git\` add .`;
  // gitJob += ` && \`which git\` commit --message "${gitMessageBuilder()}"`;
  // gitJob += ` && \`which git\` push -u github ${branch}`;
  // gitJob += ` && \`which git\` push -u heroku ${branch}`;
  shell.exec(gitJob);
  done();
}

module.exports = gitJob;
