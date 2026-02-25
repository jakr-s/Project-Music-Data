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

export const countUsers = () => getUserIDs().length;
