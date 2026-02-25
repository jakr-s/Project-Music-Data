import assert from "node:assert";
import test, { describe } from "node:test";
import {
  countUsers,
  countByKey,
  sumByKey,
  getMaxKey,
  formatSong,
  getMostByCount,
  getMostByTime,
} from "./common.mjs";

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

describe("sumByKey", () => {
  test("sumByKey sums values correctly", () => {
    const items = [
      { category: "a", value: 10 },
      { category: "b", value: 20 },
      { category: "a", value: 30 },
    ];
    const result = sumByKey(
      items,
      (i) => i.category,
      (i) => i.value
    );
    assert.deepStrictEqual(result, { a: 40, b: 20 });
  });
});

describe("getMaxKey", () => {
  test("getMaxKey returns the key with the highest value", () => {
    assert.equal(getMaxKey({ a: 5, b: 10, c: 3 }), "b");
  });

  test("getMaxKey returns null for empty object", () => {
    assert.equal(getMaxKey({}), null);
  });
});

describe("formatSong", () => {
  test("formatSong formats as Artist - Title", () => {
    assert.equal(
      formatSong({ artist: "Frank Turner", title: "Be More Kind" }),
      "Frank Turner - Be More Kind"
    );
  });
});

describe("getMostByCount", () => {
  test("getMostByCount returns most common key", () => {
    const events = [
      { song_id: "a" },
      { song_id: "b" },
      { song_id: "a" },
      { song_id: "a" },
      { song_id: "b" },
    ];
    assert.equal(
      getMostByCount(events, (e) => e.song_id),
      "a"
    );
  });

  test("getMostByCount returns null for empty events", () => {
    assert.equal(
      getMostByCount([], (e) => e.song_id),
      null
    );
  });
});

describe("getMostByTime", () => {
  test("getMostByTime returns key with highest total value", () => {
    const events = [
      { song_id: "a", duration: 100 },
      { song_id: "b", duration: 300 },
      { song_id: "a", duration: 100 },
    ];
    assert.equal(
      getMostByTime(
        events,
        (e) => e.song_id,
        (e) => e.duration
      ),
      "b"
    );
  });

  test("getMostByTime returns null for empty events", () => {
    assert.equal(
      getMostByTime(
        [],
        (e) => e.song_id,
        (e) => e.duration
      ),
      null
    );
  });
});
