var buildify = require('buildify');

buildify.task({
  name: 'js',
  task: function() {
    console.log('building vendor javascript');
    buildify('bower_components')
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
      .save('../assets/javascript/vendor.min.js');
  }
});

buildify.task({
  name: 'css',
  task: function() {
    console.log('building vendor css');
    buildify('bower_components')
      .concat([
          'animate.css/animate.min.css',
          'font-awesome/css/font-awesome.min.css',
          'font-mfizz/css/font-mfizz.css'
      ])
      .cssmin()
      .save('../assets/css/vendor.min.css');
  }
});

