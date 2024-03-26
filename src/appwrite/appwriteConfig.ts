// Web SDK
import { Client, Account, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_API_END_POINT) // Your API Endpoint
  .setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID

const account = new Account(client);

const databases = new Databases(client);

export { account, client, ID, databases };
