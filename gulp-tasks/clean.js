module.exports = function (gulp, del) {
  'use strict';
  return {
  // 'gulp clean:assets' -- deletes all assets except for images
  // 'gulp clean:dist' -- erases the dist folder
  // 'gulp clean:gzip' -- erases all the gzipped files
  // 'gulp clean:metadata' -- deletes the metadata file for Jekyll

    assets: function () {
      return del(['.tmp/**/*', '!.tmp/assets', '!.tmp/assets/images', '!.tmp/assets/images/**/*', 'dist/assets']);
    },
    dist: function () {
      return del(['dist/']);
    },
    gzip: function () {
      return del(['dist/**/*.gz']);
    },
    metadata: function () {
      return del(['src/.jekyll-metadata']);
    }
  };
};
