module.exports = function (gulp, shell) {
  return function (done) {
    shell.exec('python scripts/csvyml/schedule.py src/_data/schedule.yml');
    shell.exec('python scripts/csvyml/workshops.py src/_data/workshops.yml');
    done();
  };
};
