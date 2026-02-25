import assert from "node:assert";
import test, { describe } from "node:test";
import { countUsers, countByKey } from "./common.mjs";

describe("countUsers", () => {
  test("User count is correct", () => {
    assert.equal(countUsers(), 4);
  });
});

describe("countByKey", () => {
  test("countByKey counts occurrences correctly", () => {
    const items = [
      { category: "a" },
      { category: "b" },
      { category: "a" },
      { category: "c" },
      { category: "a" },
    ];
    const result = countByKey(items, (item) => item.category);
    assert.deepStrictEqual(result, { a: 3, b: 1, c: 1 });
  });

  test("countByKey returns empty object for empty input", () => {
    assert.deepStrictEqual(
      countByKey([], (x) => x),
      {}
    );
  });
});
