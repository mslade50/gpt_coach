# Become Fast nutrition logger — private Google Sheets synchronization

**Site:** https://mslade50.github.io/gpt_coach/nutrition.html

## What works today

The logger is on the same public GitHub Pages site as the exercise and training dashboards. It auto-selects today's date in the **America/New_York** time zone and stores partial entries in this phone/browser.

When Google OAuth is configured and the **Connect Google** button has successfully authorized, the logger also sends filled fields directly to the existing **private** Google Sheet using the Google Sheets API. It checks that the target sheet's date row matches the selected date before making changes, and updates only filled fields; blank form fields do not erase other values in that row.

The logged fields map to the existing Google Sheet's "Daily Log" columns A–Q. This setup currently supports the dates already prefilled in that spreadsheet: **October 8 to December 30, 2026**. Later dates require extending the Sheet and integration.

### Important limitation

This is **browser-only OAuth**, not a permanent unattended login. Google issues a short-lived access token to the browser. The OAuth token is kept **in memory only**, never in the public repo or localStorage. When it expires, tap **Connect Google** again. Google typically retains the prior consent, but a user interaction is required for a new browser token.

Local saves continue working with no Google connection; **"Saved on device" does not mean "Saved to Google Sheets."** Check the separate cloud status message for confirmation. If a connection is offline or expires, copy the entry into ChatGPT or reconnect and re-save.

For permanent hands-off, multi-day authorization, a separate authenticated backend or owner-deployed private Apps Script web app would be required. Do not put bearer tokens, Google passwords, OAuth client **secrets**, service-account private keys, or Apps Script shared secrets in this **public** GitHub repository.

## One-time Google setup (done in the Sheet owner's account)

This cannot be completed by the ChatGPT Google Drive connector, which can edit Sheets but cannot create Google Cloud OAuth credentials.

1. Open [Google Cloud Console](https://console.cloud.google.com/) and select or create a Google Cloud project under your account.
2. [Enable the Google Sheets API](https://console.cloud.google.com/apis/library/sheets.googleapis.com) for that project.
3. In **Google Auth Platform**, complete **Branding** and set **Audience**. If using a personal Gmail account, choose **External** and **Testing**, then add the Google email you use for your nutrition Sheet as a **test user**. Google may request additional settings before letting you test.
4. In **Google Auth Platform → Clients**, create a new **OAuth client ID**, application type **Web application**. In **Authorized JavaScript origins**, enter **https://mslade50.github.io** (no slash or path). You do **not** need a redirect URI for the browser token model.
5. Copy the resulting **client ID**, which ends in **.apps.googleusercontent.com**. **Do not copy a client secret.** A client ID is a public identifier; it is not a password.
6. Open the [Nutrition Logger](https://mslade50.github.io/gpt_coach/nutrition.html). In **Automatic Sheets sync**, paste the Google OAuth client ID and the URL of the existing private [Become Fast Nutrition & Training Log](https://docs.google.com/spreadsheets/d/1kcFtPe_-5ng3wdKaEA720P7e9vbjXhvJDBf8wMVwK8Y/edit) into their corresponding fields.
7. Tap **Connect Google**, choose the account with editing rights to that Sheet, approve the Sheets permission, and wait for the message **Connected**. The requested Sheets API scope can grant access to spreadsheets in your account; Google will present the scope on the consent screen.
8. Enter or adjust one test value in the logger and wait for the **Saved to Google Sheets: YYYY-MM-DD** message. Refresh the private Google Sheet to verify the value landed in the correct day. Once verified, normal edits sync automatically while the Google session token remains valid.

**Security and privacy:** The GitHub Pages site and its source code are public, but your entered data are not automatically published to the repository. The Google account needs to authorize API calls, and the Sheet is private. A public OAuth client ID is safe to use in browser code; passwords, OAuth client secrets, service-account keys, access tokens, and private data must not be publicly committed.

## Normal use

- **Morning:** Enter weight and sleep.
- **Evening:** Enter total calories, walking-only steps (excluding running), running mileage, and optional macro/training fields.
- **Big run:** Include pre-run treats, BPN/Gatorade, gels and any restaurant meals in your day's calorie total. The 80-calorie sport drink and a 50 g carbohydrate gel total approximately 280 calories when both are consumed.
- **Connection:** A green cloud status means the latest entry was written to Google Sheets. An offline, expired, or error state means the entry is saved *only on the device* until re-sent.
- **Backup:** You can still **Copy log for ChatGPT** or export CSV. The private Google Sheet remains available to your connected ChatGPT coach.

## Technical detail

Files: nutrition.html, nutrition.css, nutrition.js, nutrition-sync.js. The direct sync adapter uses Google Identity Services's browser token flow and the Google Sheets values.get / values.batchUpdate REST API; it performs a date-row match before writing. Filled fields are written individually in one batch so other columns are preserved.

OAuth client ID and target spreadsheet ID are saved in device localStorage as **non-secret settings**; short-lived access tokens remain only in JavaScript memory. Never implement a "secret" API key in public JavaScript or publish body-weight or medical records to GitHub Pages.

References:
- https://developers.google.com/identity/oauth2/web/guides/use-token-model
- https://developers.google.com/workspace/sheets/api/quickstart/js
- https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
