module.exports = function (gulp, $, streamSeries) {
  return {
    head: function () {
      // 'gulp inject:head' -- injects our style.css file into the head of our HTML
      return gulp.src('src/_includes/head.html')
      .pipe($.inject(streamSeries(
        gulp.src('.tmp/assets/stylesheets/vendor*.css', {read: false}),
        gulp.src('.tmp/assets/stylesheets/style*.css', {read: false})),
        {
          ignorePath: '.tmp',
          addPrefix: '{{site.baseurl}}',
          addRootSlash: false
        }))
        .pipe(gulp.dest('src/_includes'));
    },

    footer: function () {
      // 'gulp inject:footer' -- injects our index.js file into the end of our HTML
      return gulp.src('src/_includes/scripts.html')
      .pipe($.inject(streamSeries(
        gulp.src('.tmp/assets/javascript/vendor*.js', {read: false}),
        gulp.src('.tmp/assets/javascript/main*.js', {read: false})),
        {
          ignorePath: '.tmp',
          addPrefix: '{{site.baseurl}}',
          addRootSlash: false
        }))
        .pipe(gulp.dest('src/_includes'));
    }
  };
};
