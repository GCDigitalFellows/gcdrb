var buildify = require('buildify');

buildify()
  .changeDir('bower_components')
  .concat([
      'jquery/dist/jquery.min.js',
      'animated-header/js/animated-header.js',
      'FitText.js/jquery.fittext.js',
      'jquery.easing/js/jquery.easing.min.js',
      'wow/dist/wow.min.js',
      'tether/dist/js/tether.js',
      'bootstrap/dist/js/bootstrap.js',
      'jquery.serializeJSON/jquery.serializejson.min.js',
      'bootstrap-validator/dist/validator.min.js'])
  .uglify()
  .changeDir('..')
  .save('assets/javascript/vendor.min.js');
