import { getUserIDs } from "./data.mjs";

/** Count occurrences grouped by a key extracted from each item */
export function countByKey(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

export const countUsers = () => getUserIDs().length;
