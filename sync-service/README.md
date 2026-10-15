# Remembered Google connection

This private Worker lets the existing GitHub Pages logger reconnect automatically on each visit. The public site URL and all device records stay in place. Nutrition and training share one device identity, while keeping their existing independent queues, conflict checks and history caches.

## Security and lifetime

- A non-exportable P-256 private key is stored in IndexedDB on each browser. It signs the method, service URL, timestamp, random nonce and exact request body. A public device ID alone cannot access the service. The service rejects replayed requests and proofs older than 90 seconds.
- Google authorization uses a top-level POST from the exact configured site origin, an encrypted HttpOnly callback cookie, state and PKCE. This avoids popup and third-party-cookie dependencies on iPhone. State is valid for ten minutes. Only the configured owner, with verified email, can authorize a device.
- The server exchanges authorization codes. Access and refresh tokens are AES-GCM encrypted in D1; the encryption key, client secret and owner email are Worker secrets. Google tokens never reach the logger or its storage. D1 contains connection credentials and temporary proof nonces, not nutrition/training records.
- The proxy is restricted to the configured spreadsheet. Only log reads and individual RAW updates to Daily Log B–Q / Training Log B–K are allowed. Date/header writes, blank clears, other tabs, other files, formulas and arbitrary proxy destinations are rejected. Existing client-side formula/dropdown/date/conflict/readback safeguards still apply.
- Device connections last up to 180 days of inactivity. Normal Google token renewal extends that lifetime. Google can revoke or expire access; clearing site storage loses the device key and requires sign-in again. Normal reloads, browser restarts, page navigation and short-lived token expiration do not require consent again.
- Disconnect revokes only the current device record. It preserves device logs, pending edits and Sheet records. Other connected devices continue working. Google account settings can revoke the app grant globally.
- Responses use no-store and expose no upstream Google error bodies. Worker request logging is disabled to avoid collecting OAuth callback URLs. The service worker caches only public site assets.

## Deployment checklist

The checked-in frontend endpoint is intentionally disabled until setup and real owner authorization are verified. Existing GIS memory-only authorization remains as a fallback for an unconfigured service or an alternate spreadsheet.

1. Confirm Cloudflare account `ba4875f01f2bc46dd48e1e26d2ec9080`, Worker `become-fast-sync` and a **new** database `become-fast-connections`. Do not reuse other project databases. Review the existing plan and obtain approval before any billable provisioning. No paid-plan upgrade is needed for the expected personal usage; shared paid-plan allowances/overages depend on the account.
2. Create the D1 database, replace the placeholder database ID in `wrangler.jsonc`, and apply `schema.sql` only to that new database.
3. Create a separate Google Web application OAuth client in the existing project, with exactly `https://become-fast-sync.mckinleyslade.workers.dev/auth/callback` as its redirect URI. No JavaScript origins are needed for this server client. Preserve the existing browser client.
4. Set the Google OAuth app audience publishing status to **In production** for this personal app. External **Testing** otherwise expires Sheets refresh tokens after seven days. This does not publish the spreadsheet; the Worker still permits only the owner. Review Google's personal-use verification exception and any console warnings before submitting.
5. Set Worker secrets using Wrangler: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `OWNER_EMAIL`, `TOKEN_ENCRYPTION_KEY` (32 random bytes, base64url). Transfer a downloaded client credential file directly into secret storage without printing it; keep it outside the repository. Never place these values in Pages assets, logs, tests or public config. Do not rotate unrelated credentials.
6. Deploy the service and confirm `/health` is ready. Verify real owner consent and a signed read through the service before enabling it for all users. Obtain required action-time approval before granting renewable Google access.
7. Set `ENDPOINT` in `google-connection.js` to the verified HTTPS service URL. Test opening, reloading, nutrition/training navigation, expiry renewal and both independent devices. Keep existing logged weeks untouched; use synthetic isolated records for write tests.
8. Obtain approval immediately before the Git push. Verify GitHub Pages deployment and public assets afterward. Do not clear browser storage to upgrade; devices need one initial Google consent for this new connection method.

Rollback: disable the frontend endpoint and redeploy the previous Pages release. Existing direct GIS authorization still works; all device queues and Sheet records remain intact. Disable the private Worker if required. Deleting connection databases or credentials requires separate approval.

## Verification

`node --test tests/*.test.cjs` runs the original sync regression suite, both remembered-controller reload/queue round trips and actual Worker handler tests using real P-256/AES-GCM operations and an in-memory SQLite database. Google token endpoints are synthetic in these tests; real Google owner authorization must be verified separately.

The local browser preview additionally exercises real IndexedDB CryptoKey persistence, a top-level authorization redirect/callback, reloads, navigation from nutrition to training, saved training/checklist restoration, and forced access-token expiry/renewal. Preview identities and Sheet responses are synthetic and isolated from the user's workbook.

References: [Google web server OAuth](https://developers.google.com/identity/protocols/oauth2/web-server), [refresh-token expiration](https://developers.google.com/identity/protocols/oauth2#expiration), [personal-use verification exception](https://support.google.com/cloud/answer/13464321), [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/).
