import axios, { AxiosError } from "axios";

export default class ApiError extends Error {
  statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleApiError = (
  error: Error | AxiosError | string | unknown
): ApiError => {
  let message = "An error occurred, please try again later";

  if (axios.isAxiosError(error)) {
    if (error?.response?.data.message) {
      message = error?.response?.data.message;
    } else if (error.message) {
      message = error.message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return new ApiError(message);
};
