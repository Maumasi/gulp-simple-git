# gulp-simple-git
<p>
A simple Gulp task to run common Git tasks that can be automated.
</p>
</br>

<hr>
## Install
```
npm install --save-dev gulp-simple-git
```

## Use

### Gulp Task

<p>
The module is a higher order function, which returns a Gulp function with the done callback.
</p>

<p>
The following is an example of how to add the module as a Gulp task
</p>

```javascript
const gulp = require('gulp');
const simpleGit = require('gulp-simple-git');

const gitOptions = {
  remote: 'origin', //.........default => 'origin'
  branch: 'master', //.........default => {local working branch}
  addAll: true, //.............`git add .` :: default => false
  commit: true, //.............`git commit` :: default => false
  message: 'auto commit', //...`-m "message to commit"` :: default => [BRANCH: {currentBranch}] | [USER: {user}] | AUTO-COMMIT :: no message for commit.
  push: true, //...............`git push` :: default => false
};
// gulp task with passed options
const { gitTask } = simpleGit(gitOptions);

// gulp task without passed options
const { gitTask } = simpleGit();

// gulp task with options
gulp.task('git_with_options', gulp.series(gitTask));
```

</br>

#### Command line options
<p>
In the command line options are passed with tags:
</p>
```bash
-R, --remote "origin" #.........default => 'origin'
-B, --branch "master" #.........default => {local working branch}
-a  #...........................`git add .` :: default => false
-c  #...........................`git commit` :: default => false
-m "message to commit" #........`-m "message to commit"` :: default => [BRANCH: {currentBranch}] | [USER: {user}] | AUTO-COMMIT :: no message for commit.
-p #............................`git push` :: default => false
```

#### Options object
<p>
Options are passed in as an object:
</p>

```javascript
const gitOptions = {
  remote: 'origin', //.........default => 'origin'
  branch: 'master', //.........default => {local working branch}
  addAll: true, //.............`git add .` :: default => false
  commit: true, //.............`git commit` :: default => false
  message: 'auto commit', //...`-m "message to commit"` :: default => [BRANCH: {currentBranch}] | [USER: {user}] | AUTO-COMMIT :: no message for commit.
  push: true, //...............`git push` :: default => false
};
```
</br>

### Gulp Info

```javascript
const gulp = require('gulp');
const simpleGit = require('gulp-simple-git');

const { gitInfo } = simpleGit();

const {
  remotelyTrackedBranches, //...<object> with remote branches as key and an array of their respectively tracked branches
  currentWorkingBranch, //......<string> name of the current working branch
  remoteBranches, //............<array> of remote branches
  localBranches, //.............<array> of local branches
  user, //......................<string> git username
} = gitInfo;

```












</br>
