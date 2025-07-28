const fspp = require("../fs-promise-proxy");
const {
  getRenderedTemplate,
  makeDestPath,
  throwStringifiedError,
  getRelativeToBasePath,
  getRenderedTemplatePath,
  getTransformedTemplate,
} = require("./_common-action-utils");

const actionInterfaceTest = require("./_common-action-interface-check");

module.exports = async function (data, cfg, plop) {
  const interfaceTestResult = actionInterfaceTest(cfg);
  if (interfaceTestResult !== true) {
    throw interfaceTestResult;
  }
  const fileDestPath = makeDestPath(data, cfg, plop);
  try {
    // check path
    const pathExists = await fspp.fileExists(fileDestPath);

    if (!pathExists) {
      throw "File does not exist";
    } else {
      let fileData = await fspp.readFile(fileDestPath);
      cfg.templateFile = getRenderedTemplatePath(data, cfg, plop);
      const replacement = await getRenderedTemplate(data, cfg, plop);

      if (typeof cfg.pattern === "string" || cfg.pattern instanceof RegExp) {
        fileData = fileData.replace(cfg.pattern, replacement);
      }

      const transformed = await getTransformedTemplate(fileData, data, cfg);
      await fspp.writeFile(fileDestPath, transformed);
    }
    return getRelativeToBasePath(fileDestPath, plop);
  } catch (err) {
    throwStringifiedError(err);
  }
}
