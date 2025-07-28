const { fileExists } = require("../../src/fs-promise-proxy.js");
const path = require("path");
const nodePlop = require("../../src/index.js");
const { setupMockPath } = require("../helpers/path.js");
const { clean, testSrcPath, mockPath } = setupMockPath(__filename);


describe("imported-custom-action", function () {
  afterEach(clean);

  /////
  // imported custom actions should execute
  //

  let customAction;
  beforeEach(() => {
    // If the module uses `module.exports = ...`, use as is.
    // If it uses `exports.default = ...`, use `.default`.
    customAction = require(path.resolve(mockPath, "custom-action.js"));
    if (customAction && customAction.default) {
      customAction = customAction.default;
    }
  });

  test("imported custom action should execute correctly", async function () {
    const plop = await nodePlop();
    const testFilePath = path.resolve(testSrcPath, "test.txt");
    plop.setActionType("custom-del", customAction);

    // add the file
    const addTestFile = { type: "add", path: testFilePath };
    // remove the file
    const deleteTestFile = { type: "custom-del", path: testFilePath };

    const generator = plop.setGenerator("", {
      actions: [addTestFile, deleteTestFile],
    });

    expect(typeof plop.getActionType("custom-del")).toBe("function");

    const results = await generator.runActions({});
    const testFileExists = await fileExists(testFilePath);

    expect(results.failures.length).toBe(0);
    expect(results.changes.length).toBe(2);
    expect(testFileExists).toBe(false);
  });

  test("imported custom action can throw errors", async function () {
    const plop = await nodePlop();
    const testFilePath = path.resolve(testSrcPath, "test2.txt");
    plop.setActionType("custom-del", customAction);

    // remove the file
    const deleteTestFile = { type: "custom-del", path: testFilePath };

    // remove a file that doesn't exist (should error)
    const generator = plop.setGenerator("", { actions: [deleteTestFile] });
    const results = await generator.runActions({});

    expect(results.failures.length).toBe(1);
    expect(results.failures[0].error.startsWith("Path does not exist")).toBe(
      true,
    );
  });
});
