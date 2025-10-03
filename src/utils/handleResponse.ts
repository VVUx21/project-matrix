import { ApiResponse } from "@/types/api";

export function handleResponse<T = unknown>(response: T): ApiResponse<T> {
    return {
        status: "success",
        data: response,
    };
}
