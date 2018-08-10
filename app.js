'use strict';

// Patched version of swagger-node-runner waiting on https://github.com/theganyo/swagger-node-runner/pull/119
var Runner = require('@openapi-mock/swagger-node-runner');
var express = require('express');
var path = require('path');
var chalk = require('chalk');

function logPath(name, path) {
  const required = path.parameters ? path.parameters.filter(parameter => parameter.required).map(parameter => parameter.name) : [];
  console.log(chalk.green(name), Object.keys(path).filter(key => key !== 'parameters'), required.length ? `required: ${required}` : '');
}

function logPaths(paths) {
  Object.keys(paths).forEach((key) => {
    logPath(key, paths[key]);
  });
}

function registerApp(app, runner, port) {
  const swaggerExpress = runner.expressMiddleware();
  swaggerExpress.register(app);
  app.listen(port);
  logPaths(swaggerExpress.runner.swagger.paths);
  console.log(`Mock API running at http://127.0.0.1:${port}${swaggerExpress.runner.swagger.basePath || ''}`);
  return app;
};

function createApp({
  spec = path.join(__dirname, './example/spec/petstore.no-key.json'),
  mock,
  config = path.join(__dirname, '.'),
  port = process.env.PORT || 10010} = {}) {
  var config = {
    configDir: config,
    swaggerFile: spec,
    appRoot: __dirname,
    bagpipes: {
      _router: {
        mockControllersDirs: [mock]
      }
    }
  };

  const app = express();

  Runner.create(config, function(err, runner) {
    if (err) { throw err; }
    registerApp(app, runner, port);
  });

  return app;
}

module.exports = createApp
