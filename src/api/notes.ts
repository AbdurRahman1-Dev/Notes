import { Query } from "appwrite";
import { ID, account, databases } from "../appwrite/appwriteConfig";

export async function handleCreateNote() {
  const user = await account.get();
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
        userId: user?.$id,
        category: "",
        favorite: false,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// get all notes

export async function getNotes() {
  const user = await account.get();
  try {
    return await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_NOTES_COLLECTION_ID,
      // [Query.search("title", "user")]
      [Query.equal("userId", [user?.$id])]
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getSearchNotes(text: string) {
  const user = await account.get();
  try {
    return await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_NOTES_COLLECTION_ID,
      // [Query.search("title", "user")]
      [Query.equal("userId", [user?.$id]), Query.search("title", text)]
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
