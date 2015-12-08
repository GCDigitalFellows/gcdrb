module.exports = function (gulp, $, isProduction, browserSync) {
  return {
    scripts: function () {
      // 'gulp scripts' -- creates a index.js file from your JavaScript files and
      // creates a Sourcemap for it
      // 'gulp scripts --prod' -- creates a index.js file from your JavaScript files,
      // minifies, gzips and cache busts it. Does not create a Sourcemap
      // NOTE: The order here is important since it's concatenated in order from
      // top to bottom, so you want vendor scripts etc on top
      return gulp.src('src/assets/javascript/*.js')
        .pipe($.newer('.tmp/assets/javascript/*.js', {dest: '.tmp/assets/javascript', ext: '.js'}))
        .pipe($.if(!isProduction, $.sourcemaps.init()))
        .pipe($.concat('main.js'))
        .pipe($.size({
          title: 'scripts',
          showFiles: true
        }))
        .pipe($.if(isProduction, $.rename({suffix: '.min'})))
        .pipe($.if(isProduction, $.if('*.js', $.uglify({preserveComments: 'some'}))))
        .pipe($.if(isProduction, $.size({
          title: 'minified scripts',
          showFiles: true
        })))
        .pipe($.if(isProduction, $.rev()))
        .pipe($.if(!isProduction, $.sourcemaps.write('.')))
        .pipe($.if(isProduction, gulp.dest('.tmp/assets/javascript')))
        .pipe($.if(isProduction, $.if('*.js', $.gzip({append: true}))))
        .pipe($.if(isProduction, $.size({
          title: 'gzipped scripts',
          gzip: true,
          showFiles: true
        })))
        .pipe(gulp.dest('.tmp/assets/javascript'))
        .pipe($.if(!isProduction, browserSync.stream()));
    },
    vendor: function () {
      // gulp scripts:vendor
      // NOTE: The order here is important since it's concatenated in order from
      // top to bottom, so you want vendor scripts etc on top
      return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/animated-header/js/animated-header.js',
        'bower_components/FitText.js/jquery.fittext.js',
        'bower_components/jquery.easing/js/jquery.easing.min.js',
        'bower_components/wow/dist/wow.min.js',
        'bower_components/tether/dist/js/tether.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/jquery.serializeJSON/jquery.serializejson.min.js'
        // 'bower_components/bootstrap-validator/dist/validator.min.js',
        // 'bower_components/bootstrap/dist/js/umd/scrollspy.js'
      ])
        .pipe($.newer('.tmp/assets/javascript/vendor.js', {dest: '.tmp/assets/javascript', ext: '.js'}))
        .pipe($.if(!isProduction, $.sourcemaps.init()))
        .pipe($.concat('vendor.js'))
        .pipe($.size({
          title: 'scripts',
          showFiles: true
        }))
        .pipe($.if(isProduction, $.rename({suffix: '.min'})))
        .pipe($.if(isProduction, $.if('*.js', $.uglify({preserveComments: 'some'}))))
        .pipe($.if(isProduction, $.size({
          title: 'minified scripts',
          showFiles: true
        })))
        .pipe($.if(isProduction, $.rev()))
        .pipe($.if(!isProduction, $.sourcemaps.write('.')))
        .pipe($.if(isProduction, gulp.dest('.tmp/assets/javascript')))
        .pipe($.if(isProduction, $.if('*.js', $.gzip({append: true}))))
        .pipe($.if(isProduction, $.size({
          title: 'gzipped scripts',
          gzip: true,
          showFiles: true
        })))
        .pipe(gulp.dest('.tmp/assets/javascript'))
        .pipe($.if(!isProduction, browserSync.stream()));
    }
  };
};
