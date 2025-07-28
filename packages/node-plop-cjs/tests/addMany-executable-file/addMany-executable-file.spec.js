const fs = require("fs");
const nodePlop = require("../../src/index.js");
const { setupMockPath } = require("../helpers/path.js");

const { clean, testSrcPath, mockPath } = setupMockPath(__filename);

describe("addMany-executable-file", function () {
  afterEach(clean);

  let plop;
  let executableFlagAddMany;
  let res;

  beforeAll(async () => {
    plop = await nodePlop(`${mockPath}/plopfile.js`);
    executableFlagAddMany = plop.getGenerator("executable-flag-add-many");
    res = executableFlagAddMany.runActions({ executableName: "ls command" });
    await res;
  });

  if (process.platform !== "win32") {
    test("addMany action keeps the executable flag", () => {
      const destStats = fs.statSync(`${testSrcPath}/ls-command.sh`);
      expect(destStats.mode & fs.constants.S_IXUSR).toBe(fs.constants.S_IXUSR);
    });
  } else {
    test.skip("[windows] addMany action keeps the executable flag", (t) => {
      const destStats = fs.statSync(`${testSrcPath}/ls-command.sh`);
      expect(destStats.mode & fs.constants.S_IXUSR).toBe(fs.constants.S_IXUSR);
    });
  }
});
