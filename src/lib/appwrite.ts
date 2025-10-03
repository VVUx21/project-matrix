import { Account, Client, Databases, ID } from "appwrite";

// Validate required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  NEXT_PUBLIC_APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}\n` +
    'Please create a .env.local file with the required variables.'
  );
}

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const database = new Databases(client);
export { ID };

export async function createDocument<T extends Omit<Document, keyof Document>>(
  collectionId: string,
  data: T
) {
  try {
    return await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      collectionId,
      ID.unique(),
      data
    );
  } catch (error) {
    throw error;
  }
}

export async function getDocument(collectionId: string, documentId: string) {
  try {
    return await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      collectionId,
      documentId
    );
  } catch (error) {
    throw error;
  }
}

export async function updateDocument<
  T extends Partial<Omit<Document, keyof Document>>,
>(collectionId: string, documentId: string, data: T) {
  try {
    return await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      collectionId,
      documentId,
      data
    );
  } catch (error) {
    throw error;
  }
}

export async function deleteDocument(collectionId: string, documentId: string) {
  try {
    return await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      collectionId,
      documentId
    );
  } catch (error) {
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getDocumentByQuery(collectionId: string, queries: any[]) {
  try {
    return await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      collectionId,
      queries
    );
  } catch (error) {
    throw error;
  }
}
