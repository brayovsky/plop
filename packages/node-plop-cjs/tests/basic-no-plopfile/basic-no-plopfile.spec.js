const fs = require("fs");
const path = require("path");
const nodePlop = require("../../src/index.js");
const { setupMockPath } = require("../helpers/path.js");
const { clean, testSrcPath } = setupMockPath(__filename);

describe("basic-no-plopfile", function () {
  afterEach(clean);

  let plop;

  beforeEach(async () => {
    plop = await nodePlop();
    const name = "basic test name";
    plop.setHelper("uCase", (txt) => txt.toUpperCase());
    plop.setGenerator("basic-add-no-plopfile", {
      description: "adds a file using a template",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "What is your name?",
          validate: function (value) {
            if (/.+/.test(value)) {
              return true;
            }
            return "name is required";
          },
        },
      ],
      actions: [
        {
          type: "add",
          path: `${testSrcPath}/{{dashCase name}}.txt`,
          template: "{{uCase name}}",
        },
      ],
    });

    const basicAdd = plop.getGenerator("basic-add-no-plopfile");
    await basicAdd.runActions({ name });
  });

  test("Check that the file has been created", () => {
    const filePath = path.resolve(testSrcPath, "basic-test-name.txt");

    expect(fs.existsSync(filePath)).toBe(true);
  });

  test("Test the content of the rendered file", () => {
    const filePath = path.resolve(testSrcPath, "basic-test-name.txt");
    const content = fs.readFileSync(filePath).toString();

    expect(content === "BASIC TEST NAME").toBe(true);
  });
});
