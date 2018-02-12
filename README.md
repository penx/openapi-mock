# OpenAPI Mock

CLI utility to start a mock server based upon a Swagger/OpenAPI JSON or YAML spec file.

Uses [swagger-node-runner](https://github.com/theganyo/swagger-node-runner) and [sway](https://github.com/apigee-127/sway).

## Install

`npm install -g openapi-mock`


## Usage

```
Usage: openapi-mock [options] <spec>


Options:

  -V, --version        output the version number
  -m, --mock <dir>     path to mock directory
  -c, --config <file>  path to config file
  -p, --port <n>       port to start the mock server on
  -h, --help           output usage information
```
