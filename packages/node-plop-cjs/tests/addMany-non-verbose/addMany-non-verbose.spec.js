const fs = require("fs");
const path = require("path");
const nodePlop = require("../../src/index.js");
const { setupMockPath } = require("../helpers/path.js");

const { clean, testSrcPath, mockPath } = setupMockPath(__filename);

describe("addMany-non-verbose", function () {
  afterEach(clean);

  let plop;
  beforeEach(async () => {
    plop = await nodePlop(`${mockPath}/plopfile.js`);
  });

  test("Check that all files have been created", async function () {
    const multipleAddsResult = await plop
      .getGenerator("multiple-adds")
      .runActions({ name: "John Doe" });

    const expectedFiles = [
      "john-doe/add.txt",
      "john-doe/another-add.txt",
      "john-doe/nested-folder/a-nested-add.txt",
      "john-doe/nested-folder/another-nested-add.txt",
      "john-doe/nested-folder/my-name-is-john-doe.txt",
    ];

    expectedFiles.forEach((file) => {
      const filePath = path.resolve(testSrcPath, file);
      expect(fs.existsSync(filePath)).toBe(true);
    });

    // has the summary line
    expect(multipleAddsResult.changes[0].path.includes("5 files added")).toBe(
      true,
    );
    // does not have additional lines
    expect(multipleAddsResult.changes[0].path.includes("\n")).toBe(false);
  });
});
