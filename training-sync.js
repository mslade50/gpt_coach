/* Configure the shared, memory-only Google connection for the training form. */
window.TrainingSyncConfig = {
  dataPrefix: "hybrid400-session-log-v2:",
  ids: { cloudSyncStatus: "trainingCloudStatus", connectGoogle: "connectTrainingGoogle", connectGoogleTop: "connectTrainingTop", googleClientId: "trainingClientId", googleSheetId: "trainingSheetId", clearEntry: "clearSessionLog", syncGoogleNow: "retryTrainingSync", googleConnectionLabel: "trainingConnectionLabel", saveEntry: "saveTrainingLog", syncConflicts: "trainingSyncConflicts", syncConflictLabel: "trainingConflictLabel", useSheetConflict: "useTrainingSheetConflict", keepDeviceConflict: "keepTrainingDeviceConflict" }
};
