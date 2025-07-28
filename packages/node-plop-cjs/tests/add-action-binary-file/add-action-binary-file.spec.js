const fs = require("fs");
const path = require("path");
const nodePlop = require("../../src/index.js");
const { setupMockPath } = require("../helpers/path.js");

const { clean, testSrcPath, mockPath } = setupMockPath(__filename);

describe("add-action-binary-file", () => {
  afterEach(clean);

  let plop;
  beforeEach(async () => {
    plop = await nodePlop();
  });

  /////
  //
  //

  test("Add action does not fail on binary file", async function () {
    plop.setGenerator("addBinary", {
      actions: [
        {
          type: "add",
          path: `${testSrcPath}/{{dashCase name}}-plop-logo.png`,
          templateFile: `${mockPath}/plop-logo.png`,
        },
      ],
    });

    const filePath = path.resolve(testSrcPath, "test-plop-logo.png");
    await plop.getGenerator("addBinary").runActions({ name: "test" });
    expect(fs.existsSync(filePath)).toBeTruthy();
  });
});
