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

export function filterFridayNight(events) {
  return events.filter((event) => {
    const date = new Date(event.timestamp);
    const day = date.getDay(); // 0 = Sun, 5 = Fri, 6 = Sat
    const seconds = event.seconds_since_midnight;
    // (Friday 5pm – Saturday 4am)
    return (day === 5 && seconds >= 61200) || (day === 6 && seconds < 14400);
  });
}

export function getLongestStreak(events) {
  if (events.length === 0) return null;

  const streaks = [];
  let currentSongId = events[0].song_id;
  let currentLength = 1;

  for (let i = 1; i < events.length; i++) {
    if (events[i].song_id === currentSongId) {
      currentLength++;
    } else {
      streaks.push({ songId: currentSongId, length: currentLength });
      currentSongId = events[i].song_id;
      currentLength = 1;
    }
  }
  streaks.push({ songId: currentSongId, length: currentLength });

  const maxLength = Math.max(...streaks.map((s) => s.length));
  const maxSongIds = [
    ...new Set(
      streaks.filter((s) => s.length === maxLength).map((s) => s.songId)
    ),
  ];

  return { songIds: maxSongIds, length: maxLength };
}

export const countUsers = () => getUserIDs().length;
