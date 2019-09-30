
'use strict'

const shell = require('shelljs');

let tempRemotes = [];
let tempBranckes = [];
let remotelyTrackedBranches = {};
let currentWorkingBranch = null;
//
shell.exec('\`which git\` branch -a').split('\n').forEach(x => {
  const branchStr = x.trim();
  const isWorkingBranch = branchStr.split('').some(char => char === '*');
  //
  if(branchStr !== 'ls') {
    if(isWorkingBranch) {
      currentWorkingBranch = branchStr.split('*')[1].trim();
      tempBranckes.push(currentWorkingBranch);
    //
    } else if(!x.split('').some(char => char === '/') && (x.length)) {
      tempBranckes.push(branchStr);
    //
    } else if(x.split('').some(char => char === '/')) {
      const remoteArr = x.trim().split('/');
      const remote = remoteArr[1].trim();
      const trackedBranch = remoteArr[2].trim();
      tempRemotes.push(remote);
      if(!remotelyTrackedBranches[remote] && trackedBranch && trackedBranch.length) {
        remotelyTrackedBranches[remote] = [];
      }
      if(!remotelyTrackedBranches[remote].some(b => (b === trackedBranch))) {
        remotelyTrackedBranches[remote].push(trackedBranch);
      }
    }
  }
});


const remoteBranches = [...new Set(tempRemotes)];
const localBranches = [...new Set(tempBranckes)];
const branchData = {remoteBranches, remotelyTrackedBranches, localBranches, currentWorkingBranch};

const gitInfo = {
    user: shell.exec('`which git` config --list | `which grep` "user.name"').split('=')[1].split('\n')[0],
    ...branchData
};

module.exports = gitInfo;
