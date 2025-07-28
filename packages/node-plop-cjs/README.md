Node-Plop CJS
=============

[![npm](https://img.shields.io/npm/v/node-plop-cjs.svg)](https://www.npmjs.com/package/node-plop-cjs)

**CommonJS version of node-plop - programmatic plop for fun and profit**

This is a CommonJS (require/module.exports) version of node-plop, kept in sync with the main ESM version. This package provides the same functionality as node-plop but uses CommonJS module syntax for compatibility with older Node.js projects and environments that don't support ES modules.

## What is this?

This is the backend code that drives the plop CLI tool. It allows you to automate code generation through processes and tools OTHER than the command line, making it easier to integrate plop functionality into your Node.js applications.

## Usage

```javascript
const nodePlop = require('node-plop-cjs');

// Load an instance of plop from a plopfile
const plop = await nodePlop('./path/to/plopfile.js');

// Get a generator by name
const basicAdd = plop.getGenerator('basic-add');

// Run all the generator actions using the data specified
basicAdd.runActions({name: 'this is a test'}).then(function (results) {
  // Do something after the actions have run
});
```

## Version Sync

This package is kept in sync with the main `node-plop` package (currently v0.32.0). All features and bug fixes are ported to maintain compatibility.

## Key Differences from ESM version

- **Module System**: Uses CommonJS (`require`/`module.exports`) instead of ES modules (`import`/`export`)
- **Helper Functions**: Uses older helper function names for compatibility:
  - `kebabCase` instead of `kebab-case`
  - `camelCase` instead of `camel-case`
  - `pascalCase` instead of `pascal-case`
  - etc.

## Installation

```bash
npm install node-plop-cjs
```

## Why CommonJS?

While the JavaScript ecosystem is moving toward ES modules, many existing projects and tools still rely on CommonJS. This package ensures that you can use plop's powerful code generation capabilities in:

- Legacy Node.js applications
- Build tools that require CommonJS
- Environments with strict CommonJS requirements
- Projects that cannot easily migrate to ES modules

## Documentation

For full documentation on how to use node-plop, please refer to the main [plop documentation](https://github.com/plopjs/plop) and [node-plop documentation](https://github.com/plopjs/plop/tree/main/packages/node-plop). The API is identical except for the module system differences noted above.
