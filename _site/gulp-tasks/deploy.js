module.exports = function (gulp, $) {
  'use strict';
  return {
    cname: function () {
      // 'gulp deploy:cname' -- writes CNAME file to dist folder
      return gulp.src([
        'src/CNAME'
      ])
      .pipe(gulp.dest('dist'));
    },

    push: function () {
      // 'gulp deploy:push' -- pushes your dist folder to Github
      return gulp.src('dist/**/*')
        .pipe($.ghPages({
          branch: 'master',
          remoteUrl: 'git@github.com:GCDigitalFellows/gcdigitalfellows.github.io.git'
        }));
    },

    pushstage: function () {
      // 'gulp deploy:stage' -- pushes dist folder to Github staging repo
      return gulp.src('dist/**/*')
        .pipe($.ghPages({
          branch: 'gh-pages',
          remoteUrl: 'git@github.com:GCDigitalFellows/gcdrb.git'
        }));
    }

    // deploy: function (done) {
    //   // 'gulp deploy' -- copies CNAME and pushes to github
    //   gulp.series(
    //     'build',
    //     // 'deploy:cname',
    //     'deploy:push'
    //   );
    //   done();
    // },
    //
    // stage: function (done) {
    //   // 'gulp deploy' -- copies CNAME and pushes to github
    //   gulp.series(
    //     'build:stage',
    //     // 'deploy:cname',
    //     'deploy:pushstage'
    //   );
    //   done();
    // }
  };
};
