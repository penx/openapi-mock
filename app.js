'use strict';

// Patched version of swagger-node-runner waiting on https://github.com/theganyo/swagger-node-runner/pull/119
var Runner = require('@penx/swagger-node-runner');
var app = require('express')();
var path = require('path');

module.exports = app; // for testing

function registerApp(runner, port) {
  const swaggerExpress = runner.expressMiddleware();
  swaggerExpress.register(app);
  app.listen(port);
  console.log('Paths:')
  console.log(Object.keys(swaggerExpress.runner.swagger.paths));
  console.log('Server running at http://127.0.0.1:' + port);
};

function createApp({
  spec = path.join(__dirname, './example/spec/petstore.json'),
  mock,
  config = path.join(__dirname, '.'),
  port = process.env.PORT || 10010} = {}) {
  // If spec not defined, load example
  // If config not defined, load default
  var config = {
    configDir: config,
    swaggerFile: spec,
    appRoot: __dirname
  };

  Runner.create(config, function(err, runner) {
    if (err) { throw err; }
    registerApp(runner, port);
  });

  return app;
}

module.exports = createApp
