# Automatic training log

Open the [training dashboard](https://mslade50.github.io/gpt_coach/#session-log), select the workout, and enter what you actually did. Fields save automatically on this device. Tap **Connect Google** with the account that owns your nutrition workbook; subsequent edits sync automatically to its private **Training Log** tab. Copying the coach report is optional.

The page shows separate device-save and Google-sync status. **Verified in Google Sheets** means the write was read back successfully. **Save & sync** saves immediately; **Sync & refresh** retries queued changes and downloads history, opening sign-in if needed. Google sign-in may need another tap after a reload or session expiry. Connect on each device with the same account and workbook. Keep the page open or reopen it to send offline changes; there is no background upload while the browser is closed.

## Shared history and conflict handling

After connecting, the page downloads every dated Training Log row into the device cache. **Training history** lists all saved days; selecting a day restores its form and checklist. Connected, visible pages refresh every 30 seconds, on focus, and when returning from another app. Nutrition uses the same full-history refresh for its forms and weekly summaries.

Downloads never generate uploads. Unsaved form input and queued edits are protected while other cloud fields update. Downloads are cached so returning to a date or reopening the page offline preserves the latest downloaded results. A blank cloud cell never clears an unknown device-only value.

If two devices edit the same field from different starting values, sync holds that date and retains both versions. **Use Sheet version** keeps the cloud record; **Keep this device's edits** explicitly applies the queued version. The losing version is backed up locally. Older queues without a baseline also stop before replacing a different existing cloud value. Independent edits to different fields merge automatically. Conflict detection runs before the write; a change made by another device during the final network request remains a limitation.

New checklist values use versioned JSON containing stable exercise IDs, labels, and the item count. Existing readable checklists are still accepted. Checking, unchecking, and resetting progress all sync without marking the workout completed.

## What is recorded

Each scheduled calendar date has one row: program week, day, session name, actual completion status, run/total volume, timed reps/intervals, main lifts, notes, checklist progress, and an update timestamp. Units stay as entered in the free-text fields. Workout prescriptions never become completed results automatically. Checking an exercise records checklist progress without marking the whole workout completed.

Today follows Eastern time, including daylight-saving changes. A manually selected past or future session stays selected. Logs use the actual program date and week, not a repeating training-block week label. Changing sessions flushes any pending edits to the original date before loading the new session.

Only changed, nonblank fields are written. An evening addition or later edit preserves the other fields, including changes made directly in Sheets. Clearing a field in the form does not erase its Sheet value; make intentional cloud deletions directly in Sheets. **Clear device copy** clears that date's device copy and pending uploads, after confirmation, without clearing the Sheet.

## Privacy and recovery

The workbook stays private. OAuth tokens live only in page memory; they are never saved in browser storage or the repository. The shared public OAuth client ID and spreadsheet ID are identifiers, not credentials. The service worker caches public site assets only, not Google API responses or Sheet records.

Device entries and the retry queue use separate training storage keys. **Export training backup** downloads those records locally. Older logs keyed by ambiguous block-week labels are retained and included in the backup; they are not automatically assigned to dates or uploaded.

The Training Log has dated rows from July 27, 2026 through December 31, 2027. Extend the dates before logging beyond that range. Preserve the header row and keep each date unique. Sync stops without writing if dates are missing/duplicated, headers change, a target cell contains a formula, or a value violates a dropdown rule.

## Implementation and checks

`session-log.js` owns the form and dated device records. `app.js` publishes the selected session's date. `training-sync-core.js` supplies the training schema to the shared field-level queue in `nutrition-sync-core.js`; `training-sync.js` configures the shared Google controller in `nutrition-sync.js`. Training and nutrition have independent queues and write to different workbook tabs.

Run the regression checks with `node --test tests/*.test.cjs`. Actual OAuth write/edit verification should use an unused date and remove only the synthetic test values afterward.
