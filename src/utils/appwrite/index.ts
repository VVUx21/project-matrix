import { Query } from "appwrite";

import {
  createDocument,
  deleteDocument,
  getDocumentByQuery,
  updateDocument,
} from "@/lib/appwrite";
import { PaymentDetails, UserInput } from "@/types/appwrite";

import { handleError } from "../handleError";
import { handleResponse } from "../handleResponse";

const USERS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const PAYMENTS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_PAYMENT_COLLECTION_ID!;

export async function registerUser(userDetails: UserInput, userId: string) {
  try {
    const alreadyRegisteredUser = await getDocumentByQuery(
      USERS_COLLECTION_ID,
      [Query.equal("phoneNumber", userDetails.phoneNumber)]
    );
    if (alreadyRegisteredUser.documents.length > 0) {
      return {
        status: "error",
        data: "User already registered",
      };
    }
    const response = await createDocument(USERS_COLLECTION_ID, {
      ...userDetails,
      userId,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getUser(userId: string) {
  try {
    const response = await getDocumentByQuery(USERS_COLLECTION_ID, [
      Query.equal("userId", userId),
      Query.orderDesc("$createdAt"), // Most recent first
    ]);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function updateUser(
  userId: string,
  userDetails: Partial<UserInput>
) {
  try {
    const response = await updateDocument(
      USERS_COLLECTION_ID,
      userId,
      userDetails
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteUser(userId: string) {
  try {
    const response = await deleteDocument(USERS_COLLECTION_ID, userId);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function handleUserPayment(paymentDetails: PaymentDetails) {
  try {
    const response = await createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_PAYMENT_COLLECTION_ID!,
      paymentDetails
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getUserPaymentStatus(userId: string) {
  try {
    const response = await getDocumentByQuery(PAYMENTS_COLLECTION_ID!, [
      Query.equal("userId", userId),
      Query.equal("state", "COMPLETED"),
      Query.orderDesc("$createdAt"), // Most recent payment first
    ]);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getAllUsersAndPayments() {
  try {
    const users = await getDocumentByQuery(USERS_COLLECTION_ID, [
      Query.limit(2000),
      Query.orderDesc("$createdAt"), // Most recent registrations first
    ]);
    const payments = await getDocumentByQuery(PAYMENTS_COLLECTION_ID, [
      Query.limit(2000),
      Query.orderDesc("$createdAt"), // Most recent payments first
    ]);

    return handleResponse({
      users: users.documents,
      payments: payments.documents,
    });
  } catch (error) {
    return handleError(error);
  }
}
