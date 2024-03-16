const conf = {
  appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
  DatabaseIdId: String(import.meta.env.VITE_DATABASE_ID),
  notesCollectionId: String(import.meta.env.VITE_NOTES_COLLECTION_ID),
  appwriteEndpoint: String(import.meta.env.VITE_API_END_POINT),
};

export default conf;
