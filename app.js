'use strict';

// Patched version of swagger-node-runner waiting on https://github.com/theganyo/swagger-node-runner/pull/119
const Runner = require('@openapi-mock/swagger-node-runner');
const express = require('express');
const path = require('path');

const logPaths = require('./lib/logPaths');

function createRunner(config) {
  return new Promise(resolve => {
    Runner.create(config, function(err, runner) {
      if (err) { throw err; }
      resolve(runner);
    });
  });
}

function createServer(app, runner, port) {
  const swaggerExpress = runner.expressMiddleware();
  swaggerExpress.register(app);
  const server = app.listen(port);
  logPaths(swaggerExpress.runner.swagger.paths);
  console.log(`Mock API running at http://127.0.0.1:${port}${swaggerExpress.runner.swagger.basePath || ''}`);
  return server;
};

async function createApp({
  spec = path.join(__dirname, './example/spec/petstore.no-key.json'),
  mock,
  config = path.join(__dirname, '.'),
  port = process.env.PORT || 10010} = {}) {
  const runnerConfig = {
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
  const runner = await createRunner(runnerConfig);
  const server = createServer(app, runner, port);

  return server;
}

module.exports = createApp
