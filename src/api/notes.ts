import { ID, databases } from "../appwrite/appwriteConfig";

export async function handleCreateNote() {
  try {
    return await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_NOTES_COLLECTION_ID,
      ID.unique(),

      {
        title: "",
        parentID: "",
        contents: "",
        tags: [],
        userId: "",
        category: "",
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getNotes() {
  try {
    return await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_NOTES_COLLECTION_ID
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleNote(id) {
  try {
    return await databases.getDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_NOTES_COLLECTION_ID,
      id
    );
  } catch (error) {
    console.log(error);
  }
}

export async function updateNotes(id, newData) {
  try {
    await databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_NOTES_COLLECTION_ID,
      id,
      newData
    );
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNotes(id) {
  try {
    await databases.deleteDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_NOTES_COLLECTION_ID,
      id
    );
  } catch (error) {
    console.log(error);
  }
}
