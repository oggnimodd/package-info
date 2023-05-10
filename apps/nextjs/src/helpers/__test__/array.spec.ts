import { describe, expect, test } from "vitest";

import { sortAndRemoveDuplicates } from "../array";

describe("sortAndRemoveDuplicates", () => {
  test("should sort and remove duplicates from an array", () => {
    const array = ["c", "a", "b", "a", "c", "d", "b"];

    const result = sortAndRemoveDuplicates(array);

    expect(result).toEqual(["a", "b", "c", "d"]);
  });

  test("should return an empty array if input array is empty", () => {
    const array: string[] = [];

    const result = sortAndRemoveDuplicates(array);

    expect(result).toEqual([]);
  });
});
