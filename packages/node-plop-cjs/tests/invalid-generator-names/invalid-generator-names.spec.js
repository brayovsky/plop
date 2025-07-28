const nodePlop = require("../../src/index.js");
const { setupMockPath } = require("../helpers/path.js");
const { clean } = setupMockPath(__filename);

describe("invalid-generator-names", function () {
  afterEach(clean);

  let plop;
  beforeEach(async () => {
    plop = await nodePlop();
  });

  test("Invalid generator names test", function () {
    plop.setGenerator("test");
    expect(() => plop.getGenerator("error")).toThrowError(
      'Generator "error" does not exist.',
    );
  });
});
