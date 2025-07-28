const path = require("path");
const { normalizePath } = require("../../src/actions/_common-action-utils.js");
const del = require("del");
const fspp = require("../../src/fs-promise-proxy.js");

/**
 * @param {string} testFilename
 */
function setupMockPath(testFilename) {
  const __dirname = path.dirname(testFilename);
  const mockPath = normalizePath(__dirname);
  const testSrcPath = path.resolve(mockPath, "src");

  async function clean() {
    // remove the src folder
    await del([normalizePath(testSrcPath)], { force: true });

    try {
      const mockIsEmpty = (await fspp.readdir(mockPath)).length === 0;
      if (mockIsEmpty) {
        await del([mockPath], { force: true });
      }
    } catch (err) {
      // there was no mock directory to remove
    }
  }

  return {
    mockPath,
    testSrcPath,
    clean,
  };
}

module.exports = { setupMockPath };
