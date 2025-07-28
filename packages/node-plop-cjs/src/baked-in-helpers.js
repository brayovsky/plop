const {
  camelCase,
  snakeCase,
  dotCase,
  pathCase,
  sentenceCase,
  constantCase,
  paramCase,
  pascalCase,
} = require("change-case");
const { titleCase } = require("title-case");

module.exports = {
  camelCase: camelCase,
  snakeCase: snakeCase,
  dotCase: dotCase,
  pathCase: pathCase,
  lowerCase: (str) => str.toLowerCase(),
  upperCase: (str) => str.toUpperCase(),
  sentenceCase: sentenceCase,
  constantCase: constantCase,
  titleCase: titleCase,

  dashCase: paramCase,
  kabobCase: paramCase,
  kebabCase: paramCase,

  properCase: pascalCase,
  pascalCase: pascalCase,
};
