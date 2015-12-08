module.exports = function (gulp, $, browserSync) {
  return function (done) {
    // 'gulp serve' -- open up your website in your browser and watch for changes
    // in all your files and update them when needed
    browserSync({
      // tunnel: true,
      // open: false,
      server: {
        baseDir: ['.tmp', 'dist']
      }
    });

    // Watch various files for changes and do the needful
    gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], gulp.series('jekyll', browserSync.reload));
    gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('jekyll'));
    gulp.watch('src/assets/javascript/**/*.js', gulp.series('scripts'));
    gulp.watch('src/assets/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('src/assets/images/**/*', browserSync.reload);
    done();
  };
};
