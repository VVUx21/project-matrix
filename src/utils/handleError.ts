import { AppwriteError } from "@/types/appwrite";
import { ApiResponse } from "@/types/api";

const commonErrors = ["User (role: guests) missing scope (account)"];
const customErrors = [
  {
    code: 409,
    message: "Already Registered!",
  },
];

export function handleError<T = unknown>(
  err: unknown,
  defaultMessage: string = "An error occurred"
): ApiResponse<T> {
  console.error(err);

  if (!isAppwriteError(err)) {
    return {
      status: "error",
      data: undefined as T,
      message: defaultMessage,
    };
  }

  if (commonErrors.includes(err.message)) {
    return {
      status: "error",
      data: undefined as T,
      message: "Common error occurred",
    };
  }

  const customError = customErrors.find((error) => error.code === err.code);
  if (customError) {
    return {
      status: "error",
      data: undefined as T,
      message: customError.message,
    };
  }

  return {
    status: "error",
    data: undefined as T,
    message: err.message,
  };
}

function isAppwriteError(error: unknown): error is AppwriteError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    "type" in error
  );
}
