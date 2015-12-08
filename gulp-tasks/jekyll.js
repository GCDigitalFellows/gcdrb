module.exports = function (gulp, shell) {
  return function (done) {
    if (!isProduction) {
      shell.exec('jekyll build');
      done();
    } else if (isProduction) {
      shell.exec('jekyll build --config _config.yml,_config.build.yml');
      done();
    };
  };
};
