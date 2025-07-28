const fs = require("fs");
const path = require("path");
const nodePlop = require("../../src/index.js");
const { setupMockPath } = require("../helpers/path.js");
const { clean, testSrcPath, mockPath } = setupMockPath(__filename);

describe("append-empty", function () {
  afterEach(clean);

  let plop;
  let makeList;
  let appendToList;

  beforeEach(async () => {
    plop = await nodePlop(`${mockPath}/plopfile.js`);
    makeList = plop.getGenerator("make-list");
    appendToList = plop.getGenerator("append-to-list");
  });

  test("Check if entry will be appended", async function () {
    await makeList.runActions({ listName: "test" });
    await appendToList.runActions({ listName: "test", name: "Marco" });
    await appendToList.runActions({ listName: "test", name: "Polo" });
    const filePath = path.resolve(testSrcPath, "test.txt");
    const content = fs.readFileSync(filePath).toString();

    expect(content).toBe("Marco\nPolo");
  });
});
