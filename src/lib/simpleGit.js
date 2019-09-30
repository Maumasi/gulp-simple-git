
'use strict'

const shell = require('shelljs');
const { argv } = require('yargs');
const gitMessageBuilder = require('./_gitMessageBuilder');
const gitInfo = require('./_gitInfo');

// gulp task
function simpleGit(options) {
  // const { currentBranch } = gitInfo;
  const {
    message,
    remote,
    branch,
    addAll,
    commit,
    push,
  } = { remote: 'origin', branch: gitInfo.currentWorkingBranch, message: gitMessageBuilder(), addAll: false, commit: false, push: false,  ...options };
  //
  return {
    gitInfo,
    gitTask(done) {
      let gitJob = '';
      if(addAll || argv.a) {
        gitJob += `\`which git\` add .`;
      }
      if(commit || argv.c) {
        if(gitJob.length) {
          gitJob += ' && ';
        }
        gitJob += `\`which git\` commit --message "${message}"`;
      }
      if(push || argv.p) {
        if(gitJob.length) {
          gitJob += ' && ';
        }
        gitJob += `\`which git\` push -u ${argv.R || argv.remote || remote} ${argv.B || argv.branch || branch}`;
      }
      // 
      shell.exec(gitJob);
      done();
    }
  }
}

module.exports = simpleGit;
