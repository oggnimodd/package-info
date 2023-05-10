import { expect } from "vitest";

import { getDependencies } from "../packages";

describe("getDependencies", () => {
  it("should return sorted and unique dependencies and devDependencies", () => {
    const jsonString = `{
      "dependencies": {
        "react": "^17.0.2",
        "lodash": "^4.17.21",
        "react-dom": "^17.0.2",
        "lodash": "^4.17.21"
      },
      "devDependencies": {
        "jest": "^27.0.6",
        "typescript": "^4.3.5"
      }
    }`;

    const json = JSON.parse(jsonString);

    const result = getDependencies(json);

    expect(result.dependencies).toEqual(["lodash", "react", "react-dom"]);
    expect(result.devDependencies).toEqual(["jest", "typescript"]);
  });

  it("should return empty arrays if dependencies or devDependencies are not present", () => {
    const json = {};

    const result = getDependencies(json);

    expect(result.dependencies).toEqual([]);
    expect(result.devDependencies).toEqual([]);
  });
});
