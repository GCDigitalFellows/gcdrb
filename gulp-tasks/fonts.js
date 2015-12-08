module.exports = function (gulp, $) {
  return function () {
    // 'gulp fonts' -- copies your fonts to the temporary assets folder
    return gulp.src([
      'src/assets/fonts/**/*',
      'bower_components/font-awesome/fonts/*',
      'bower_components/font-mfizz/fonts/*'
    ])
    .pipe(gulp.dest('.tmp/assets/fonts'))
    .pipe($.size({title: 'fonts'}));
  };
};
