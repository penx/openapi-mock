#!/usr/bin/env node

var program = require('commander');
var {version} = require('./package.json');
var app = require('./app.js');

program
  .version(version)
  .usage('[options] <spec>')
  .option('-m, --mock <dir>', 'Mock directory')
  .option('-c, --config <file>', 'Config file')
  .option('-p, --port <n>', 'Port', parseInt);

program.parse(process.argv);

const spec = program.args[0];
const {mock, config, port} = program;

app({spec, mock, config, port})
