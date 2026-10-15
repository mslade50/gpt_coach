-- Credentials are encrypted before storage. No nutrition or training records are stored here.
CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  public_key TEXT NOT NULL,
  credentials TEXT NOT NULL,
  expires INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS request_nonces (
  device TEXT NOT NULL,
  nonce TEXT NOT NULL,
  expires INTEGER NOT NULL,
  PRIMARY KEY (device, nonce)
);
CREATE INDEX IF NOT EXISTS nonce_expiry ON request_nonces(expires);
