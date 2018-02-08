'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var path = require('path');

module.exports = app; // for testing

function createApp({spec = './example/spec/petstore.json', mock, config = '.', port = process.env.PORT || 10010} = {}) {
  // If spec not defined, load example
  // If config not defined, load default
  var config = {
    configDir:  path.join(__dirname, config),
    swaggerFile: path.join(__dirname, spec),
    appRoot: __dirname
  };

  SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }
    swaggerExpress.register(app);
    app.listen(port);
    console.log('Paths:')
    console.log(Object.keys(swaggerExpress.runner.swagger.paths));
    console.log('Server running at http://127.0.0.1:' + port);
  });

  return app;
}

module.exports = createApp
