module.exports = function (gulp, $) {
  return function () {
    return gulp.src('src/assets/images/**/*')
      .pipe($.imagemin({
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest('.tmp/assets/images'))
      .pipe($.size({title: 'images'}));
  };
};
