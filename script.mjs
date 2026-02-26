import { getUserIDs, getListenEvents, getSong } from "./data.mjs";
import {
  formatSong,
  getMostByCount,
  getMostByTime,
  filterFridayNight,
  getLongestStreak,
  getSongsListenedEveryDay,
  getTopGenres,
} from "./common.mjs";

function populateUserDropdown() {
  const select = document.getElementById("user-select");

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- Select a user --";
  select.appendChild(defaultOption);

  for (const id of getUserIDs()) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    select.appendChild(option);
  }

  select.addEventListener("change", () => {
    displayUserData(select.value);
  });
}

function displayUserData(userID) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (!userID) return;

  const events = getListenEvents(userID);

  if (events.length === 0) {
    const p = document.createElement("p");
    p.textContent = "This user didn't listen to any songs.";
    results.appendChild(p);
    return;
  }

  const songKeyFn = (e) => e.song_id;
  const artistKeyFn = (e) => getSong(e.song_id).artist;
  const durationFn = (e) => getSong(e.song_id).duration_seconds;

  // Q1: Most listened song by count
  const mostSongCount = getMostByCount(events, songKeyFn);
  if (mostSongCount) {
    addResult(
      results,
      "Most listened song (by plays)",
      formatSong(getSong(mostSongCount))
    );
  }

  // Q2: Most listened artist by count
  const mostArtistCount = getMostByCount(events, artistKeyFn);
  if (mostArtistCount) {
    addResult(results, "Most listened artist (by plays)", mostArtistCount);
  }

  // Q4: Most listened song by time
  const mostSongTime = getMostByTime(events, songKeyFn, durationFn);
  if (mostSongTime) {
    addResult(
      results,
      "Most listened song (by time)",
      formatSong(getSong(mostSongTime))
    );
  }

  // Q4: Most listened artist by time
  const mostArtistTime = getMostByTime(events, artistKeyFn, durationFn);
  if (mostArtistTime) {
    addResult(results, "Most listened artist (by time)", mostArtistTime);
  }

  // Q3: Friday night – only show if there are Friday night events
  const fridayEvents = filterFridayNight(events);
  if (fridayEvents.length > 0) {
    const fridaySongCount = getMostByCount(fridayEvents, songKeyFn);
    if (fridaySongCount) {
      addResult(
        results,
        "Most listened song on Friday nights (by plays)",
        formatSong(getSong(fridaySongCount))
      );
    }

    const fridaySongTime = getMostByTime(fridayEvents, songKeyFn, durationFn);
    if (fridaySongTime) {
      addResult(
        results,
        "Most listened song on Friday nights (by time)",
        formatSong(getSong(fridaySongTime))
      );
    }
  }

  // Q5: Longest streak
  const streak = getLongestStreak(events);
  if (streak) {
    const songNames = streak.songIds.map((id) => formatSong(getSong(id)));
    addResult(
      results,
      "Longest streak",
      `${songNames.join(", ")} (${streak.length} plays in a row)`
    );
  }

  // Q6: Songs listened to every day – only show if at least one exists
  const everydaySongs = getSongsListenedEveryDay(events);
  if (everydaySongs.length > 0) {
    const songNames = everydaySongs.map((id) => formatSong(getSong(id)));
    addResult(results, "Songs listened to every day", songNames.join(", "));
  }

  // Q7: Top genres – adapt label to actual count
  const topGenres = getTopGenres(events, getSong, 3);
  if (topGenres.length > 0) {
    const label =
      topGenres.length === 1 ? "Top genre" : `Top ${topGenres.length} genres`;
    addResult(results, label, topGenres.join(", "));
  }
}

function addResult(container, question, answer) {
  const heading = document.createElement("h2");
  heading.textContent = question;
  const paragraph = document.createElement("p");
  paragraph.textContent = answer;
  container.appendChild(heading);
  container.appendChild(paragraph);
}

window.addEventListener("DOMContentLoaded", populateUserDropdown);
