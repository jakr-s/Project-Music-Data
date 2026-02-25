import { getUserIDs } from "./data.mjs";

/** Count occurrences grouped by key*/
export function countByKey(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

/** Sum values (E.g. Listening Time) grouped by key */
export function sumByKey(items, keyFn, valueFn) {
  const sums = {};
  for (const item of items) {
    const key = keyFn(item);
    sums[key] = (sums[key] || 0) + valueFn(item);
  }
  return sums;
}

export function getMaxKey(map) {
  let maxKey = null;
  let maxValue = -Infinity; // Smallest numeric possible
  for (const [key, value] of Object.entries(map)) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  }
  return maxKey;
}

export function formatSong(song) {
  return `${song.artist} - ${song.title}`;
}

// -- Question helper functions --

export function getMostByCount(events, keyFn) {
  if (events.length === 0) return null;
  return getMaxKey(countByKey(events, keyFn));
}

export function getMostByTime(events, keyFn, timeFn) {
  if (events.length === 0) return null;
  return getMaxKey(sumByKey(events, keyFn, timeFn));
}

export const countUsers = () => getUserIDs().length;
