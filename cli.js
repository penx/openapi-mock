#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var {version} = require('./package.json');
var app = require('./app.js');

function resolvePath(relativePath) {
  console.log(path.join(process.cwd(), relativePath))
  return path.join(process.cwd(), relativePath);
}

program
  .version(version)
  .usage('[options] <spec>')
  .option('-m, --mock <dir>', 'path to mock directory', resolvePath)
  .option('-c, --config <file>', 'path to config file', resolvePath)
  .option('-p, --port <n>', 'port to start the mock server on', parseInt);

program.parse(process.argv);

const spec = program.args[0] ? resolvePath(program.args[0]) : undefined;
const {mock, config, port} = program;

app({spec, mock, config, port})
