module.exports = function (gulp, $, isProduction, browserSync, autoprefixer) {
  'use strict';

  return {
    styles: function () {
      // 'gulp styles' -- creates a CSS file from your SASS, adds prefixes and
      // creates a Sourcemap
      // 'gulp styles --prod' -- creates a CSS file from your SASS, adds prefixes and
      // then minifies, gzips and cache busts it. Does not create a Sourcemap
      return gulp.src('src/assets/scss/style.scss')
        .pipe($.if(!isProduction, $.sourcemaps.init()))
        .pipe($.sass({
          precision: 10,
          includePaths: ['bower_components/bootstrap/scss']
        }).on('error', $.sass.logError))
        .pipe($.postcss([
          autoprefixer({browsers: 'last 1 version'})
        ]))
        .pipe($.size({
          title: 'styles',
          showFiles: true
        }))
        .pipe($.if(isProduction, $.rename({suffix: '.min'})))
        .pipe($.if(isProduction, $.if('*.css', $.minifyCss())))
        .pipe($.if(isProduction, $.size({
          title: 'minified styles',
          showFiles: true
        })))
        .pipe($.if(isProduction, $.rev()))
        .pipe($.if(!isProduction, $.sourcemaps.write('.')))
        .pipe($.if(isProduction, gulp.dest('.tmp/assets/stylesheets')))
        .pipe($.if(isProduction, $.if('*.css', $.gzip({append: true}))))
        .pipe($.if(isProduction, $.size({
          title: 'gzipped styles',
          gzip: true,
          showFiles: true
        })))
        .pipe(gulp.dest('.tmp/assets/stylesheets'))
        .pipe($.if(!isProduction, browserSync.stream()));
    },
    vendor: function () {
      // vendor styles
      return gulp.src([
        'bower_components/animate.css/animate.min.css',
        // 'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/font-mfizz/css/font-mfizz.css'
      ])
        .pipe($.newer('.tmp/assets/stylesheets/vendor.css', {dest: '.tmp/assets/stylesheets', ext: '.css'}))
        .pipe($.if(!isProduction, $.sourcemaps.init()))
        .pipe($.concat('vendor.css'))
        .pipe($.postcss([
          autoprefixer({browsers: 'last 1 version'})
        ]))
        .pipe($.size({
          title: 'styles',
          showFiles: true
        }))
        .pipe($.if(isProduction, $.rename({suffix: '.min'})))
        .pipe($.if(isProduction, $.if('*.css', $.minifyCss())))
        .pipe($.if(isProduction, $.size({
          title: 'minified styles',
          showFiles: true
        })))
        .pipe($.if(isProduction, $.rev()))
        .pipe($.if(!isProduction, $.sourcemaps.write('.')))
        .pipe($.if(isProduction, gulp.dest('.tmp/assets/stylesheets')))
        .pipe($.if(isProduction, $.if('*.css', $.gzip({append: true}))))
        .pipe($.if(isProduction, $.size({
          title: 'gzipped styles',
          gzip: true,
          showFiles: true
        })))
        .pipe(gulp.dest('.tmp/assets/stylesheets'))
        .pipe($.if(!isProduction, browserSync.stream()));
    }
  };
};
