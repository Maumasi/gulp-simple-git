
'use strict'

const shell = require('shelljs');

const gitInfo = {
    user: shell.exec('`which git` config --list | grep "user.name"').split('=')[1].split('\n')[0],
    currentBranch: shell.exec('`which git` branch | `which grep` "*"').stdout.split(' ')[1].split('\n')[0],
};

module.exports = gitInfo;
