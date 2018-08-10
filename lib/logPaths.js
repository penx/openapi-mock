const chalk = require('chalk');

function logPath(name, path) {
  const required = path.parameters ? path.parameters.filter(parameter => parameter.required).map(parameter => parameter.name) : [];
  console.log(chalk.green(name), Object.keys(path).filter(key => key !== 'parameters'), required.length ? `required: ${required}` : '');
}

function logPaths(paths) {
  Object.keys(paths).forEach((key) => {
    logPath(key, paths[key]);
  });
}

module.exports = logPaths;
