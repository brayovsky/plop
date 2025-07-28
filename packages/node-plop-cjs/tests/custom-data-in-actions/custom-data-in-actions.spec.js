const fspp = require("../../src/fs-promise-proxy.js");
const path = require("path");
const nodePlop = require("../../src/index.js");
const { setupMockPath } = require("../helpers/path.js");
const { clean, testSrcPath, mockPath } = setupMockPath(__filename);

describe("custom-data-in-actions", function () {
  afterEach(clean);

  let plop;
  let customData;

  beforeEach(async () => {
    plop = await nodePlop(`${mockPath}/plopfile.js`);
    customData = plop.getGenerator("custom-data-in-actions");
  });

  test("Check that custom data is in template", async function () {
    await customData.runActions({});
    const file = path.resolve(testSrcPath, "Frodo-loves-who.txt");
    const content = await fspp.readFile(file);
    expect(content).toBe("Frodo loves Gandalf");
  });

  test("Check that data is overridden", async function () {
    await customData.runActions({ name: "Sauron" });
    const filePath = path.resolve(testSrcPath, "Sauron-loves-who.txt");
    const greetSubjectPath = path.resolve(testSrcPath, "hola-world.txt");

    expect(await fspp.readFile(filePath)).toBe("Sauron loves Gandalf");
    expect(await fspp.fileExists(greetSubjectPath)).toBe(true);
  });
});
