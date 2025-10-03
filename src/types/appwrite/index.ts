import { Models } from "appwrite";

export interface UserInput {
  name: string;
  institute: string;
  email: string;
  phoneNumber: string;
  city: string;
  state: string;
  referralCode: string;
}

export interface RegisterResponse {
  success: boolean;
  data?: Models.Document;
  error?: string;
}

export interface AppwriteError {
  code: number;
  message: string;
  type: string;
}

export interface PaymentDetails {
  userId: string;
  amount: string;
  transactionId: string;
  merchantTransactionId: string;
  merchantId: string;
  state: string;
}
