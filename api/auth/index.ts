import { IAuth, ILogInRequest } from "@/interfaces/auth.interface";
import Axios from "..";
import ApiError, { handleApiError } from "@/utils/api_error";
import { InternalAxiosRequestConfig } from "axios";

class AuthService {
  static login = async (payload: ILogInRequest): Promise<IAuth> => {
    try {
      const response = await Axios({
        url: `/api/v1/auth/login`,
        method: "POST",
        data: payload,
      });

      if (!response) {
        throw new ApiError("Invalid credentials", 401);
      }

      return response.data as unknown as IAuth;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static refreshToken = async (refreshToken: string) => {
    try {
      const response = await Axios({
        url: `/api/v1/auth/token/refresh`,
        method: "POST",
        data: {
          refresh: refreshToken,
        },
      });

      console.log("response", response);

      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static request = async (originalRequest: InternalAxiosRequestConfig) => {
    return Axios.request(originalRequest);
  };
}

export default AuthService;
