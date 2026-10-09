# Become Fast nutrition logger — private Google Sheets synchronization

**Site:** https://mslade50.github.io/gpt_coach/nutrition.html

## What works today

The logger is on the same public GitHub Pages site as the exercise and training dashboards. It auto-selects today's date in the **America/New_York** time zone and stores partial entries in this phone/browser. When following today, it rolls to the new Eastern date at midnight or when the page resumes; a deliberately selected historical date stays selected. Pending edits are saved under the original day before the date changes.

When Google OAuth is configured and the **Connect Google** button has successfully authorized, the logger sends changed, filled fields directly to the existing **private** Google Sheet using the Google Sheets API. Morning and evening submissions update the same date row. Unedited fields and blank form fields never erase existing Sheet values. Notes are sent as literal text, so a leading `=` cannot execute a spreadsheet formula.

The logged fields map to the existing Google Sheet's "Daily Log" columns A–Q. The adapter locates the date in column A rather than calculating a fixed row number. It verifies headers, the unique date match, dropdown choices, and protected formula cells before writing, and reads back the result before confirming success. Summary formulas in R–U are untouched. Dates already prefilled in the Sheet are **October 8 to December 30, 2026**; later dates require extending the Sheet with its existing formulas and validation, without changing the integration. The bounded date scan supports up to 10,000 Sheet rows.

### Important limitation

This is **browser-only OAuth**, not a permanent unattended login. Google issues a short-lived access token to the browser. The OAuth token is kept **in memory only**, never in the public repo or localStorage. When it expires, tap **Connect Google** again. Google typically retains the prior consent, but a user interaction is required for a new browser token.

Local saves continue working with no Google connection; **"Saved on device" does not mean "Saved to Google Sheets."** Check the separate cloud status message for **Verified in Google Sheets**. Changed fields remain in a durable per-Sheet queue across reloads. Network errors, HTTP 429, and server errors retry with backoff up to one minute while the page is online and connected. Returning online or tapping **Retry sync** also drains queued days. If authorization expires, tap **Connect Google**; the queue resumes without copying anything into ChatGPT. Browser-only sync cannot run while the page is closed.

After an initial online visit, a service worker caches only the public logger HTML, CSS, and JavaScript for offline reopening. Google sign-in and Google API responses are never cached. Clearing browser site data removes local records and pending edits; export a CSV backup first. Use one logger tab per browser while editing.

For permanent hands-off, multi-day authorization, a separate authenticated backend or owner-deployed private Apps Script web app would be required. Do not put bearer tokens, Google passwords, OAuth client **secrets**, service-account private keys, or Apps Script shared secrets in this **public** GitHub repository.

## One-time Google setup (done in the Sheet owner's account)

The deployed logger includes a public browser OAuth client ID and the nutrition Sheet ID by default. The client permits `https://mslade50.github.io` and `http://localhost:8787`; Sheets API is enabled. The app stays in testing mode with the Sheet owner's account on its test-user list. On an iPhone, open the logger, tap **Connect Google**, choose that account, and approve Sheets permission. The steps below are for maintaining or replacing the configuration.

This cannot be completed by the ChatGPT Google Drive connector, which can edit Sheets but cannot create Google Cloud OAuth credentials.

1. Open [Google Cloud Console](https://console.cloud.google.com/) and select or create a Google Cloud project under your account.
2. [Enable the Google Sheets API](https://console.cloud.google.com/apis/library/sheets.googleapis.com) for that project.
3. In **Google Auth Platform**, complete **Branding** and set **Audience**. If using a personal Gmail account, choose **External** and **Testing**, then add the Google email you use for your nutrition Sheet as a **test user**. Google may request additional settings before letting you test.
4. In **Google Auth Platform → Clients**, create a new **OAuth client ID**, application type **Web application**. In **Authorized JavaScript origins**, enter **https://mslade50.github.io** (no slash or path). For local integration testing, also add **http://localhost:8787**. You do **not** need a redirect URI for the browser token model.
5. Copy the resulting **client ID**, which ends in **.apps.googleusercontent.com**. **Do not copy a client secret.** A client ID is a public identifier; it is not a password.
6. Open the [Nutrition Logger](https://mslade50.github.io/gpt_coach/nutrition.html). In **Automatic Sheets sync → Connection settings**, check the public Google OAuth client ID. The existing private [Become Fast Nutrition & Training Log](https://docs.google.com/spreadsheets/d/1kcFtPe_-5ng3wdKaEA720P7e9vbjXhvJDBf8wMVwK8Y/edit) is the default target. A test user must be the account that owns or can edit this Sheet, which can differ from the account used in Google Cloud.
7. Tap **Connect Google**, choose the account with editing rights to that Sheet, approve the Sheets permission, and wait for the message **Connected**. The requested Sheets API scope can grant access to spreadsheets in your account; Google will present the scope on the consent screen.
8. Enter or adjust one test value in the logger and wait for **Verified in Google Sheets: YYYY-MM-DD · Daily Log row N**. Refresh the private Google Sheet to verify the value landed in the correct day. Once verified, normal edits sync automatically while the Google session token remains valid. Follow the OAuth consent screen rather than assuming that signing in alone granted Sheets access.

**Security and privacy:** The GitHub Pages site and its source code are public, but your entered data are not automatically published to the repository. The Google account needs to authorize API calls, and the Sheet is private. A public OAuth client ID is safe to use in browser code; passwords, OAuth client secrets, service-account keys, access tokens, and private data must not be publicly committed.

## Normal use

- **Morning:** Enter weight and sleep.
- **Evening:** Enter total calories, walking-only steps (excluding running), running mileage, and optional macro/training fields.
- **Big run:** Include pre-run treats, BPN/Gatorade, gels and any restaurant meals in your day's calorie total. The 80-calorie sport drink and a 50 g carbohydrate gel total approximately 280 calories when both are consumed.
- **Connection:** A green cloud status means the latest entry was written to Google Sheets. An offline, expired, or error state means the entry is saved *only on the device* until re-sent.
- **Backup:** You can still **Copy log for ChatGPT** or export CSV. The private Google Sheet remains available to your connected ChatGPT coach.
- **Existing local entries:** On the first run of this adapter, legacy local entries are queued to fill only empty Sheet cells. Existing cloud values win during this migration. Subsequent explicit field edits replace only that field. A connected logger loads cloud values into fields that have no queued or unsaved edits.
- **Clear local copy:** After confirmation, this clears the selected day's device record and cancels its queued edits. It never clears the Sheet. Make intentional cloud deletions in Sheets. Sync pauses this control during a write.
- **Training choices:** The form matches the Sheet dropdown. Legacy `Long run` maps to `Long / hard run`; threshold/upper-body combinations map to `Run + strength`; sprint/speed maps to `Sprint + lifting`; bike/row/cross-train maps to `Other`, with minutes still recorded separately.

## Technical detail

Files: nutrition.html, nutrition.css, nutrition.js, nutrition-sync-core.js, nutrition-sync.js, nutrition-sw.js. The direct sync adapter uses Google Identity Services's browser token flow and the Google Sheets REST API. Changed fields are written individually in one RAW batch so other columns and formulas are preserved. An edit arriving during a write keeps its own queue revision and is sent in a later pass. Avoid sorting or structurally editing Daily Log during a sync: the direct Sheets API cannot lock the row against concurrent structural changes.

OAuth client ID and target spreadsheet ID are saved in device localStorage as **non-secret settings**; short-lived access tokens remain only in JavaScript memory. Never implement a "secret" API key in public JavaScript or publish body-weight or medical records to GitHub Pages.

## Verification

Run `node --test tests/*.test.cjs` for the dependency-free regression suite. It covers date lookup and midnight/DST changes, morning/evening merges, literal notes, zero values, migration, offline/reload recovery, edits during requests, dropdown validation, missing/duplicate dates, formula protection, and readback failure.

Live connector verification on October 9, 2026: a temporary note was written to `Daily Log!Q85` (December 30), edited in the same cell, and read back after both operations. The date and R–U formulas remained intact. Only that test-created note was cleared afterward, with blank readback confirmed. This verifies the live Sheet write/edit path; browser OAuth and the deployed logger require their own end-to-end authorization test.

References:
- https://developers.google.com/identity/oauth2/web/guides/use-token-model
- https://developers.google.com/workspace/sheets/api/quickstart/js
- https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
