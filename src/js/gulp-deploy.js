var ftp = require('vinyl-ftp');
var gulp = require('gulp');
var gulpPrompt = require('gulp-prompt');
var strRoot = '../'; // root of project relative to gulp-deploy.js file
var strFtpRoot = 'mydevto/'; // ftp root folder

// task deploy
//  (1) prompt user for FTP password
//    Note: gulp-prompt requires a pipe() so we use a dummy 'gulp.js' pipe
//  (2) create a connection
//  (3) upload files from www/**/* to remote folder
//    Note: **/* means all files and subfolders
//
gulp.task('deploy', done => {
  gulp
    .src('gulp-deploy.js')
    .pipe(
      gulpPrompt.prompt(
        {
          type: 'password',
          name: 'pass',
          message: 'Please enter FTP password (hint:bxx)'
        },
        function(res) {
          var conn = getFtpConnection(res.pass);
          var localFiles = [strRoot + 'www/*.html', strRoot + 'www/*.xml'];
          gulp
            .src(strRoot + 'www/js/**/*')
            .pipe(conn.newer(strFtpRoot + 'js/'))
            .pipe(conn.dest(strFtpRoot + 'js/'));
          gulp
            .src(strRoot + 'www/css/**/*')
            .pipe(conn.newer(strFtpRoot + 'css/'))
            .pipe(conn.dest(strFtpRoot + 'css/'));
          gulp
            .src(localFiles)
            .pipe(conn.newer(strFtpRoot))
            .pipe(conn.dest(strFtpRoot));
        }
      )
    )
    .on('end', function() {
      done();
    });
});

function getFtpConnection(strPass) {
  return ftp.create({
    host: 'ftp.forexbestea.com',
    port: 21,
    user: 'admin@tldr.pro',
    password: strPass,
    parallel: 5
  });
}
