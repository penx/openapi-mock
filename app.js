'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var path = require('path');

module.exports = app; // for testing

var config = {
  configDir:  path.join(__dirname, './config/swagger'),
  swaggerFile: path.join(__dirname, './spec/petstore.json'),
  appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  swaggerExpress.register(app);
  var port = process.env.PORT || 10010;
  app.listen(port);
  console.log('Paths:')
  console.log(Object.keys(swaggerExpress.runner.swagger.paths));
  console.log('Server running at http://127.0.0.1:' + port);
});
