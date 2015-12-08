'use strict';

module.exports = function (gulp) {
  return function (done) {
    // 'gulp rebuild' -- WARNING: Erases your assets and built site, use only when
    // you need to do a complete rebuild
    gulp.series('clean:dist', 'clean:assets',
    'clean:metadata');
    done();
  };
};
