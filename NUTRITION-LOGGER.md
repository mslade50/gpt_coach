# Become Fast nutrition logger

Live route (GitHub Pages): https://mslade50.github.io/gpt_coach/nutrition.html

## Current capabilities
- Same GitHub Pages origin as the training dashboard, with a mobile-first interface.
- Selects **today** in the America/New_York time zone on initial load.
- Saves weight, sleep, calories, walking-only steps, mileage, training type, macros, intra-workout carbohydrate, restaurant meals and notes.
- Auto-saves to browser localStorage, separately for each date, including partial morning and evening entries.
- Computes seven-day local summaries without treating missing values as zero.
- Lets the user copy a single day or a seven-day report to ChatGPT, where the Google Drive connector can update the existing private "Become Fast — Nutrition & Training Log" spreadsheet.
- Exports local CSV backups. No personal data are stored in the GitHub repository.

## Critical privacy and sync limitation

GitHub Pages is a public static site. The browser form does **not** authenticate to Google or write directly to the private spreadsheet.

**Saved on device != synced to Google Sheets.** To share data with the coach, choose **Copy log for ChatGPT**, paste it in the coaching conversation, and request that the private Google Sheet be updated. Logging into GitHub is not needed to use the local form.

Do not put Google account tokens, spreadsheet service-account credentials, user data, or an Apps Script shared secret into this public repository, its JavaScript files, or GitHub Pages markup.

If direct synchronization is implemented later, use Google-account OAuth and appropriately limited Google Sheets permissions or a separately deployed private Apps Script form/backend. It will require a one-time authorization in the user's Google account. The public Pages site cannot authorize itself using the connected ChatGPT Google Drive app.

## Daily use
1. Open the page on a phone. The date defaults to today (Eastern time).
2. Enter morning weight/sleep and optionally press **Save on this device**; auto-save also runs while typing.
3. Add calories, walking-only steps (excluding running), and running mileage after the day.
4. Include BPN/Gatorade, gels, snack fuel, oil and restaurant calories in the total.
5. Press **Copy log for ChatGPT** and paste to the coaching conversation for official Sheet synchronization.
6. Check the private Google Sheet's Daily Log tab after ChatGPT confirms a successful update.

The mobile browser’s storage is device-specific. Using another phone or clearing browser data can lose unsynced entries. The CSV export is a backup, not a Google Sheets sync.

## Development

Three files were added: nutrition.html, nutrition.css, nutrition.js. The main index.html links to nutrition.html. No existing workout or exercise-library data structures were changed.

This page does not modify the actual running/sprint prescriptions; the most recent dated Current Athlete State and approved plan govern training.
