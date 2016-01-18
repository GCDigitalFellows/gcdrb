module.exports = function (gulp, spawn, isProduction) {
  return {
    build: function (done) {
      // Might be necessary for windows platforms
      var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

      if (!isProduction) {
        spawn('bundle', [
          'exec',
          jekyll,
          'build'
        ], {
          stdio: 'inherit'
        })
        .on('exit', function(code) {
          done(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
        });
      } else if (isProduction) {
        spawn('bundle', [
          'exec',
          jekyll,
          'build',
          '--config',
          '_config.yml,_config.build.yml'
        ], {
          stdio: 'inherit'
        })
        .on('exit', function(code) {
          done(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
        });
      }
    },

    stage: function (done) {
      // Might be necessary for windows platforms
      var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

      spawn('bundle', [
        'exec',
        jekyll,
        'build',
        '--config',
        '_config.yml,_config.stage.yml'
      ], {
        stdio: 'inherit'
      })
      .on('exit', function(code) {
        done(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
      });
    },

    doctor: function (done) {
      // just run `jekyll doctor`
      spawn('bundle', [
          'exec',
          jekyll,
          'doctor'
        ], {
          stdio: 'inherit'
        })
        .on('exit', function(code) {
          done(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
        });
    }
  };
};
