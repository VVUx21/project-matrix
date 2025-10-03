import { Models } from "appwrite";

// Generic API response type
export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  data?: T;
  message?: string;
}

// Appwrite document list response
export interface DocumentListResponse {
  documents: Models.Document[];
  total: number;
}

// User document from Appwrite
export interface UserDocument extends Models.Document {
  name: string;
  institute: string;
  email: string;
  phoneNumber: string;
  city: string;
  state: string;
  referralCode: string;
  userId: string;
}

// Payment document from Appwrite
export interface PaymentDocument extends Models.Document {
  userId: string;
  amount: string;
  transactionId: string;
  merchantTransactionId: string;
  merchantId: string;
  state: string;
}

// Combined data for admin page
export interface AdminData {
  users: any[];
  payments: any[];
}

// Payment map for quick lookup
export interface PaymentMap {
  [userId: string]: any;
}
