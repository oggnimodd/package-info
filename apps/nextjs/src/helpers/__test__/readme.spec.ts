import { describe, expect, test } from "vitest";

import { getPackageGithubUrl, getRawReadmeUrl } from "../repository";

describe("getPackageGithubUrl", () => {
  test("should return the correct GitHub URL for a valid package", async () => {
    const packageName = "react";
    const expectedUrl = "https://github.com/facebook/react";
    const result = await getPackageGithubUrl(packageName);

    expect(result).toBe(expectedUrl);
  });

  test("should return null for a package with no repository or invalid type", async () => {
    const packageName = "fd3d2a63-74d4-4a17-bad3-08da989761cc";
    const result = await getPackageGithubUrl(packageName);

    // should return null
    expect(result).toBeNull();
  });
});

describe("getRawReadmeUrl", () => {
  test("should return the correct raw README URL", () => {
    const url = "https://github.com/facebook/react";

    const rawUrl = getRawReadmeUrl(url);

    expect(rawUrl).toBe(
      "https://raw.githubusercontent.com/facebook/react/master/README.md",
    );
  });
});
