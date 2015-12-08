module.exports = function (gulp, $, isProduction) {
  return function () {
    // 'gulp html' -- does nothing
    // 'gulp html --prod' -- minifies and gzips our HTML files
    return gulp.src('dist/**/*.html')
      .pipe($.if(isProduction, $.htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true
      })))
      .pipe($.if(isProduction, $.size({title: 'optimized HTML'})))
      .pipe($.if(isProduction, gulp.dest('dist')))
      .pipe($.if(isProduction, $.gzip({append: true})))
      .pipe($.if(isProduction, $.size({
        title: 'gzipped script',
        gzip: true
      })))
      .pipe($.if(isProduction, gulp.dest('dist')));
  };
};
