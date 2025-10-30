module.exports = {
  input: './dist/index.js',
  output: {
    file: './dist/index.cjs',
    format: 'cjs',
    exports: 'auto',
    outro: `
// CommonJS compatibility: make require('wikipedia') return the function directly
// while preserving named exports as properties
const errors = require("./errors");
const resultTypes = require("./resultTypes");
const optionTypes = require("./optionTypes");
const page = require("./page");

// Make wiki function the main export
module.exports = module.exports.default;

// Add all named exports as properties of the wiki function
Object.assign(module.exports, errors, resultTypes, optionTypes, page);

// Keep .default for ES module compatibility
module.exports.default = module.exports;
    `.trim()
  }
};