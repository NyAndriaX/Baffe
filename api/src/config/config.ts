const config = {
  appName: process.env.APP_NAME,
  appVersion: process.env.APP_VERSION,
  appDescription: process.env.APP_DESCRIPTION,
  env: process.env.NODE_ENV,
  slybroadcastUrl: process.env.SLYBROADCAST_URL,
  slybroadcastUid: process.env.SLYBROADCAST_UID,
  slybroadcastPassword: process.env.SLYBROADCAST_PASSWORD,
  mobilesphereUrl: process.env.MOBILESPHERE_URL,
  mobilesphereUid: process.env.MOBILESPHERE_UID,
  mobilespherePassword: process.env.MOBILESPHERE_PASSWORD,
  gcpStorageBucket: process.env.GCP_STORAGE_BUCKET,
  gcpStorageKeyFilename: process.env.GCP_STORAGE_KEY_FILENAME,
  gcpStorageProjectId: process.env.GCP_STORAGE_PROJECT_ID,
  gcpStorageHost: process.env.GCP_STORAGE_HOST,
};

export default config;
