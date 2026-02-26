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
  filterFridayNight,
  getLongestStreak,
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

describe("filterFridayNight", () => {
  test("filterFridayNight filters correctly", () => {
    // August 2, 2024 is a Friday
    const events = [
      // Fri 4pm – NOT included
      {
        timestamp: "2024-08-02T16:00:00",
        seconds_since_midnight: 57600,
        song_id: "a",
      },
      // Fri 5pm – included
      {
        timestamp: "2024-08-02T17:00:00",
        seconds_since_midnight: 61200,
        song_id: "b",
      },
      // Fri 11pm – included
      {
        timestamp: "2024-08-02T23:00:00",
        seconds_since_midnight: 82800,
        song_id: "c",
      },
      // Sat 3am – included
      {
        timestamp: "2024-08-03T03:00:00",
        seconds_since_midnight: 10800,
        song_id: "d",
      },
      // Sat 4am – NOT included
      {
        timestamp: "2024-08-03T04:00:00",
        seconds_since_midnight: 14400,
        song_id: "e",
      },
      // Sat 10am – NOT included
      {
        timestamp: "2024-08-03T10:00:00",
        seconds_since_midnight: 36000,
        song_id: "f",
      },
    ];
    const result = filterFridayNight(events);
    assert.equal(result.length, 3);
    assert.deepStrictEqual(
      result.map((e) => e.song_id),
      ["b", "c", "d"]
    );
  });

  test("filterFridayNight returns empty for non-Friday events", () => {
    // August 1, 2024 is a Thursday
    const events = [
      {
        timestamp: "2024-08-01T18:00:00",
        seconds_since_midnight: 64800,
        song_id: "a",
      },
    ];
    assert.deepStrictEqual(filterFridayNight(events), []);
  });
});

describe("getLongestStreak", () => {
  test("getLongestStreak finds the longest consecutive run", () => {
    const events = [
      { song_id: "a" },
      { song_id: "a" },
      { song_id: "b" },
      { song_id: "b" },
      { song_id: "b" },
      { song_id: "a" },
    ];
    const result = getLongestStreak(events);
    assert.deepStrictEqual(result, { songIds: ["b"], length: 3 });
  });

  test("getLongestStreak handles ties", () => {
    const events = [
      { song_id: "a" },
      { song_id: "a" },
      { song_id: "b" },
      { song_id: "b" },
      { song_id: "c" },
    ];
    const result = getLongestStreak(events);
    assert.equal(result.length, 2);
    assert.ok(result.songIds.includes("a"));
    assert.ok(result.songIds.includes("b"));
  });

  test("getLongestStreak returns null for empty events", () => {
    assert.equal(getLongestStreak([]), null);
  });
});
