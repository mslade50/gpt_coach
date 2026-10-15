# Become Fast nutrition logger — private Google Sheets synchronization

## Remembered Google connection

Connect Google once on each browser or device. Nutrition and training share that remembered connection, restore it automatically on future visits, and renew Google access on the private server. Your existing site URL, entries and sync queues stay in place. The browser stores a non-exportable device key; Google credentials stay encrypted on the server. See [setup and security details](sync-service/README.md).

## Two-way sync across devices

Connect Google on each device with the same account and workbook. The logger downloads the full dated Daily Log history after connecting; forms, recent days, and weekly summaries then use the shared records. Connected visible pages refresh every 30 seconds and when returning to the page. **Sync & refresh** also uploads queued changes and downloads history immediately. Downloads are cached locally for offline viewing and never generate uploads themselves.

Unsaved form input and queued changes remain protected during downloads. Independent edits to different fields merge. If a cloud field changed since a device began editing it, sync retains both versions and shows **Use Sheet version** / **Keep this device's edits**. Older queues without a known baseline also pause before replacing a different populated Sheet cell. Conflict choices save a local recovery copy. Blank form fields still never delete Sheet data.

Refresh both devices once after the October 15, 2026 release, then connect Google once on each device to load shared history. Do not clear browser storage or reset the Sheet to get the update. Reloads, page navigation and normal Google access-token expiry no longer require another connection tap. There is no background sync while the browser is closed.

**Site:** https://mslade50.github.io/gpt_coach/nutrition.html

## What works today

The logger is on the same public GitHub Pages site as the exercise and training dashboards. It auto-selects today's date in the **America/New_York** time zone and stores partial entries in this phone/browser. When following today, it rolls to the new Eastern date at midnight or when the page resumes; a deliberately selected historical date stays selected. Pending edits are saved under the original day before the date changes.

After **Connect Google** successfully authorizes the device, the logger sends changed, filled fields through the private sync service to the existing **private** Google Sheet. Morning and evening submissions update the same date row. Unedited fields and blank form fields never erase existing Sheet values. Notes are sent as literal text, so a leading `=` cannot execute a spreadsheet formula.

The logged fields map to the existing Google Sheet's "Daily Log" columns A–Q. The adapter locates the date in column A rather than calculating a fixed row number. It verifies headers, the unique date match, dropdown choices, and protected formula cells before writing, and reads back the result before confirming success. Summary formulas in R–U are untouched. Dates already prefilled in the Sheet are **October 8 to December 30, 2026**; later dates require extending the Sheet with its existing formulas and validation, without changing the integration. The bounded date scan supports up to 10,000 Sheet rows.

### Connection lifetime and offline use

The default workbook uses renewable server-side OAuth. Access tokens renew automatically. Device connections expire after 180 days of inactivity. Clearing browser storage, revoking Google's app permission or an account security change can require connecting again. **Disconnect this device** clears its server credentials while preserving local entries, pending edits and Sheet records; other devices remain connected.

Local saves continue working with no Google connection; **"Saved on device" does not mean "Saved to Google Sheets."** Check the separate cloud status message for **Verified in Google Sheets**. Changed fields remain in a durable per-Sheet queue across reloads. Network errors, HTTP 429, and server errors retry with backoff up to one minute while the page is online and connected. Returning online or tapping **Sync & refresh** also drains queued days. If Google revokes the renewable grant, tap **Connect Google**; the queue resumes without copying anything into ChatGPT. Sync cannot run while the page is closed.

After an initial online visit, a service worker caches only the public logger HTML, CSS, and JavaScript for offline reopening. Google sign-in and Google API responses are never cached. Clearing browser site data removes local records and pending edits; export a CSV backup first. Use one logger tab per browser while editing.

The original memory-only browser OAuth flow remains available for an alternate workbook or an unconfigured backend; that fallback still requires reconnecting after reload or token expiry. Do not put bearer tokens, Google passwords, OAuth client **secrets**, service-account private keys, or private records in this **public** GitHub repository.

## One-time Google setup (done in the Sheet owner's account)

The default private service is configured for the Sheet owner and the existing workbook. Its separate server OAuth client uses a Worker callback and encrypted server secrets. The Google app is **In production**, avoiding Testing mode's seven-day refresh-token limit. On an iPhone, open the logger, tap **Connect Google**, choose the owner account, and approve Sheets permission once. The original public browser client remains available as a fallback; the steps below describe that fallback, while [server maintenance](sync-service/README.md) covers the remembered connection.

This cannot be completed by the ChatGPT Google Drive connector, which can edit Sheets but cannot create Google Cloud OAuth credentials.

1. Open [Google Cloud Console](https://console.cloud.google.com/) and select or create a Google Cloud project under your account.
2. [Enable the Google Sheets API](https://console.cloud.google.com/apis/library/sheets.googleapis.com) for that project.
3. In **Google Auth Platform**, complete **Branding** and set **Audience**. The personal Gmail app uses **External** and **In production**. Testing mode is suitable only for temporary testing because Sheets refresh tokens then expire after seven days. A personal app can retain Google's unverified-app warning without undergoing public-app verification.
4. In **Google Auth Platform → Clients**, create a new **OAuth client ID**, application type **Web application**. In **Authorized JavaScript origins**, enter **https://mslade50.github.io** (no slash or path). For local integration testing, also add **http://localhost:8787**. You do **not** need a redirect URI for the browser token model.
5. Copy the resulting **client ID**, which ends in **.apps.googleusercontent.com**. **Do not copy a client secret.** A client ID is a public identifier; it is not a password.
6. Open the [Nutrition Logger](https://mslade50.github.io/gpt_coach/nutrition.html). In **Automatic Sheets sync → Connection settings**, the public browser OAuth client ID applies to the fallback. The existing private [Become Fast Nutrition & Training Log](https://docs.google.com/spreadsheets/d/1kcFtPe_-5ng3wdKaEA720P7e9vbjXhvJDBf8wMVwK8Y/edit) is the default target. The server permits only its configured owner; the fallback requires an account that can edit the selected workbook.
7. Tap **Connect Google**, choose the account with editing rights to that Sheet, approve the Sheets permission, and wait for the message **Connected**. The requested Sheets API scope can grant access to spreadsheets in your account; Google will present the scope on the consent screen.
8. Enter or adjust one test value in the logger and wait for **Verified in Google Sheets: YYYY-MM-DD · Daily Log row N**. Refresh the private Google Sheet to verify the value landed in the correct day. Once verified, normal edits sync automatically while the Google session token remains valid. Follow the OAuth consent screen rather than assuming that signing in alone granted Sheets access.

**Security and privacy:** The GitHub Pages site and its source code are public, but your entered data are not automatically published to the repository. The Google account needs to authorize API calls, and the Sheet is private. A public OAuth client ID is safe to use in browser code; passwords, OAuth client secrets, service-account keys, access tokens, and private data must not be publicly committed.

## Normal use

- **Morning:** Enter weight and sleep.
- **Evening:** Enter total calories, walking-only steps (excluding running), running mileage, and optional macro/training fields.
- **Big run:** Include pre-run treats, BPN/Gatorade, gels and any restaurant meals in your day's calorie total. The 80-calorie sport drink and a 50 g carbohydrate gel total approximately 280 calories when both are consumed.
- **Connection:** **Verified in Google Sheets** confirms a write and readback. **History refreshed** confirms a successful download. Offline or failed edits remain saved on the device until sync succeeds.
- **Backup:** You can still **Copy log for ChatGPT** or export CSV. The private Google Sheet remains available to your connected ChatGPT coach.
- **Existing local entries:** On the first run of this adapter, legacy local entries are queued to fill only empty Sheet cells. Existing cloud values win during this migration. Subsequent explicit field edits replace only that field. A connected logger loads cloud values into fields that have no queued or unsaved edits.
- **Clear local copy:** After confirmation, this clears the selected day's device record and cancels its queued edits. It never clears the Sheet. Make intentional cloud deletions in Sheets. Sync pauses this control during a write.
- **Training choices:** The form matches the Sheet dropdown. Legacy `Long run` maps to `Long / hard run`; threshold/upper-body combinations map to `Run + strength`; sprint/speed maps to `Sprint + lifting`; bike/row/cross-train maps to `Other`, with minutes still recorded separately.

## Technical detail

Files: nutrition.html, nutrition.css, nutrition.js, nutrition-sync-core.js, nutrition-sync.js, google-connection.js, nutrition-sw.js and sync-service/. The remembered adapter signs requests to the private Worker, which renews Google OAuth access and calls the Sheets REST API. Changed fields are written individually in one RAW batch so other columns and formulas are preserved. An edit arriving during a write keeps its own queue revision and is sent in a later pass. Avoid sorting or structurally editing Daily Log during a sync: the Sheets API cannot lock the row against concurrent structural changes.

The fallback OAuth client ID and target spreadsheet ID are saved in device localStorage as **non-secret settings**. The default connection's non-exportable signing key lives in IndexedDB, and Google tokens remain encrypted on the server. Fallback access tokens remain only in page memory. Never implement a "secret" API key in public JavaScript or publish body-weight or medical records to GitHub Pages.

## Verification

Run `node --test tests/*.test.cjs` for the dependency-free regression suite. It covers date lookup and midnight/DST changes, morning/evening merges, literal notes, zero values, migration, offline/reload recovery, edits during requests, dropdown validation, missing/duplicate dates, formula protection, and readback failure.

On October 15, 2026, a fresh local browser origin completed real owner OAuth against the deployed private service. Signed forced renewals, full reloads, a newly opened tab and navigation between nutrition and training succeeded without another Google prompt after authorization. The protected October 12–18 Sheet rows matched their read-only baseline exactly. This authorization check made no Sheet writes; synthetic multi-device tests cover writes, conflicts, offline queues and checklists. Physical iPhone authorization remains a device-specific first connection.

Live browser OAuth verification on October 9, 2026 used the configured client at `http://localhost:8787/nutrition.html` and the real private Sheet. On the unused December 30 row (`Daily Log!85`), a morning submission wrote weight and sleep. A subsequent evening submission wrote every remaining field, including macros, fiber, non-running steps, mileage, training, and notes; independent Sheets readback confirmed all values and preserved morning fields. A later note edit updated the same row without changing the other fields. The date and R–U formulas remained intact. All synthetic test values in B–Q were removed afterward, and blank readback plus intact formulas confirmed cleanup. Regression tests separately exercise offline/reload queues, retry, authorization errors, and Eastern-time rollover. Mobile layout and the existing training dashboard were also checked in the browser.

References:
- https://developers.google.com/identity/oauth2/web/guides/use-token-model
- https://developers.google.com/workspace/sheets/api/quickstart/js
- https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
