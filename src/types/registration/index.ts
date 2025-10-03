export interface RegistrationData {
  id: string;
  name: string;
  institute: string;
  city: string;
  email: string;
  phone: string;
  referralCode: string;
  transactionId: string;
  merchantTransactionId: string;
  state: "pending" | "completed" | "failed";
  date: string;
}
