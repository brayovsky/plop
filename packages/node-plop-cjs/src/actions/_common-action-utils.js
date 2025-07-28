const path = require("path");
const fspp = require("../fs-promise-proxy");

const getFullData = (data, cfg) => Object.assign({}, cfg.data, data);

const normalizePath = (path) => {
  return !path.sep || path.sep === "\\" ? path.replace(/\\/g, "/") : path;
};

const makeDestPath = (data, cfg, plop) => {
  return path.resolve(
    plop.getDestBasePath(),
    plop.renderString(normalizePath(cfg.path) || "", getFullData(data, cfg)),
  );
};

function getRenderedTemplatePath(data, cfg, plop) {
  if (cfg.templateFile) {
    const absTemplatePath = path.resolve(
      plop.getPlopfilePath(),
      cfg.templateFile,
    );
    return plop.renderString(
      normalizePath(absTemplatePath),
      getFullData(data, cfg),
    );
  }
  return null;
}

async function getTemplate(data, cfg, plop) {
  const makeTmplPath = (p) => path.resolve(plop.getPlopfilePath(), p);

  let { template } = cfg;

  if (cfg.templateFile) {
    template = await fspp.readFile(makeTmplPath(cfg.templateFile));
  }
  if (template == null) {
    template = "";
  }

  return template;
}

async function getRenderedTemplate(data, cfg, plop) {
  const template = await getTemplate(data, cfg, plop);

  return plop.renderString(template, getFullData(data, cfg));
}

const getRelativeToBasePath = (filePath, plop) =>
  path.relative(plop.getDestBasePath(), filePath);

const throwStringifiedError = (err) => {
  if (typeof err === "string") {
    throw err;
  } else {
    throw err.message || JSON.stringify(err);
  }
};

async function getTransformedTemplate(template, data, cfg) {
  // transform() was already typechecked at runtime in interface check
  if ("transform" in cfg) {
    const result = await cfg.transform(template, data);

    if (typeof result !== "string")
      throw new TypeError(
        `Invalid return value for transform (${JSON.stringify(
          result,
        )} is not a string)`,
      );

    return result;
  } else {
    return template;
  }
}

module.exports = {
  normalizePath,
  makeDestPath,
  getRenderedTemplatePath,
  getTemplate,
  getRenderedTemplate,
  getRelativeToBasePath,
  throwStringifiedError,
  getTransformedTemplate,
};
