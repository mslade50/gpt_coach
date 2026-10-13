/* Configure the shared, memory-only Google connection for the training form. */
window.TrainingSyncConfig = {
  dataPrefix: "hybrid400-session-log-v2:",
  ids: { cloudSyncStatus: "trainingCloudStatus", connectGoogle: "connectTrainingGoogle", googleClientId: "trainingClientId", googleSheetId: "trainingSheetId", clearEntry: "clearSessionLog", syncGoogleNow: "retryTrainingSync", googleConnectionLabel: "trainingConnectionLabel", saveEntry: "saveTrainingLog" }
};
