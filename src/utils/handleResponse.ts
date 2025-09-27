export function handleResponse<T extends Response>(
  response: T
): { status: "success"; data: T } {
  return {
    status: "success",
    data: response,
  };
}
