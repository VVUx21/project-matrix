export function handleResponse(response: { status: string; data: any }): {
  status: string;
  data: any;
} {
  return {
    status: "success",
    data: response,
  };
}
