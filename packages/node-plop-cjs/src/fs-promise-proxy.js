const fs = require("fs");
const { mkdirp } = require("mkdirp");

const makeDir = mkdirp;
const readdir = fs.promises.readdir;
const stat = fs.promises.stat;
const chmod = fs.promises.chmod;
const readFile = (path) => fs.promises.readFile(path, "utf8");
const writeFile = (path, data) =>
  fs.promises.writeFile(path, data, "utf8");
const readFileRaw = (path) => fs.promises.readFile(path, null);
const writeFileRaw = (path, data) =>
  fs.promises.writeFile(path, data, null);
const fileExists = (path) =>
  fs.promises.access(path).then(
    () => true,
    () => false,
  );

const constants = fs.constants;

module.exports = {
  makeDir,
  readdir,
  stat,
  chmod,
  readFile,
  writeFile,
  readFileRaw,
  writeFileRaw,
  fileExists,
  constants,
};
