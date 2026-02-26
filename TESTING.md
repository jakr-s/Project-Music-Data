- Rubric: The website must contain a drop-down which lists four users.
  - Tested by loading the page and checking the user selector contains exactly 4 options (Users 1, 2, 3, and 4).

- Rubric: Selecting a user must display answers relevant to that user.
  - Tested by selecting each user in the drop-down and confirming the rendered answers change to match that user's data.

- Rubric: User 4 has no data, so no questions apply.
  - Tested by selecting User 4 and verifying no question/answer rows are shown, and a clear message is displayed to explain that this user listened to no songs.

- Rubric: If a question doesn't apply, hide that question and answer entirely.
  - Tested by selecting users where certain conditions are absent (for example, no Friday-night listens) and confirming the non-applicable question is not rendered at all.

- Rubric: If fewer than three genres were listened to, list only those genres and avoid "Top 3 genres" wording.
  - Tested with a user having fewer than 3 genres and verified the label adapts (for example, "Top genres" or "Top 2 genres") and only available genres are shown.

- Rubric: Unit tests must be written for at least one non-trivial function.
  - Unit tests in common.test.mjs.

- Rubric: The website must score 100 for accessibility in Lighthouse.
  - Tested by running a Lighthouse accessibility audit in Chrome DevTools on the page and recording a score of 100.
