import { AppwriteError } from "@/types/appwrite";

const commonErrors = ["User (role: guests) missing scope (account)"];
const customErrors = [
  {
    code: 409,
    message: "Already Registered!",
  },
];

export function handleError(
  err: unknown,
  defaultMessage: string = "An error occurred"
) {
  console.error(err);

  if (!isAppwriteError(err)) {
    return {
      status: "error",
      data: defaultMessage,
    };
  }

  if (commonErrors.includes(err.message)) return null;

  const customError = customErrors.find((error) => error.code === err.code);
  if (customError) {
    return {
      status: "error",
      data: customError.message,
    };
  }

  return {
    status: "error",
    data: err.message,
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
