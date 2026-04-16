import Axios from "@/api";
import {
  IAvailableLmcOwner,
  ILmcDetailCard,
  ILmcOwnerOption,
  ILmcRegisterResponse,
  ILmcSummary,
  ILmcTransactionRow,
  ILmcTransactionsParams,
  ILmcWriterOverviewRow,
  IRegisterLmcOnboardingPayload,
  IRegisterLmcPayload,
} from "@/interfaces/lmc.interface";
import { IPaginatedResults } from "@/interfaces/writers.interface";
import { handleApiError } from "@/utils/api_error";

export type WritersOverviewParams = {
  status?: string;
  search?: string;
  page?: number;
  page_size?: number;
};

class LmcService {
  static fetchAvailableLmcOwners = async (): Promise<IAvailableLmcOwner[]> => {
    try {
      const response = await Axios({
        url: `/api/v1/auth/users/available-lmc-owners/`,
        method: "GET",
      });
      return response.data as IAvailableLmcOwner[];
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static registerLmc = async (
    payload: IRegisterLmcPayload,
  ): Promise<ILmcRegisterResponse> => {
    try {
      const response = await Axios({
        url: `/api/v1/lmc/`,
        method: "POST",
        data: payload,
      });
      return response.data as ILmcRegisterResponse;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static registerLmcOnboarding = async (
    payload: IRegisterLmcOnboardingPayload,
  ): Promise<{
    user: {
      id: string;
      email: string;
      full_name: string;
      role: string;
      phone: string;
    };
    lmc: ILmcRegisterResponse;
    message: string;
  }> => {
    try {
      const hasPhoto = payload.photo instanceof File;
      const data = hasPhoto ? new FormData() : { ...payload };

      if (hasPhoto) {
        const formData = data as FormData;
        formData.append("email", payload.email);
        formData.append("first_name", payload.first_name);
        formData.append("last_name", payload.last_name);
        formData.append("phone", payload.phone);
        formData.append("password", payload.password);
        if (payload.address) formData.append("address", payload.address);
        formData.append("photo", payload.photo as File);
      }

      const response = await Axios({
        url: `/api/v1/lmc/register/`,
        method: "POST",
        data,
      });
      return response.data as {
        user: {
          id: string;
          email: string;
          full_name: string;
          role: string;
          phone: string;
        };
        lmc: ILmcRegisterResponse;
        message: string;
      };
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static fetchLmcOwners = async (): Promise<ILmcOwnerOption[]> => {
    try {
      const response = await Axios({
        url: `/api/v1/lmc/owners/`,
        method: "GET",
      });
      return response.data as ILmcOwnerOption[];
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static fetchDetailCards = async (): Promise<ILmcDetailCard[]> => {
    try {
      const response = await Axios({
        url: `/api/v1/lmc/detail-cards/`,
        method: "GET",
      });
      return response.data as ILmcDetailCard[];
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static fetchSummary = async (lmcId: string): Promise<ILmcSummary> => {
    try {
      const response = await Axios({
        url: `/api/v1/lmc/${lmcId}/summary/`,
        method: "GET",
      });
      return response.data as ILmcSummary;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static fetchWritersOverview = async (
    lmcId: string,
    params?: WritersOverviewParams,
  ): Promise<IPaginatedResults<ILmcWriterOverviewRow>> => {
    try {
      const response = await Axios({
        url: `/api/v1/lmc/${lmcId}/writers-overview/`,
        method: "GET",
        params,
      });
      return response.data as IPaginatedResults<ILmcWriterOverviewRow>;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static fetchTransactions = async (
    lmcId: string,
    params?: ILmcTransactionsParams,
  ): Promise<IPaginatedResults<ILmcTransactionRow>> => {
    try {
      const response = await Axios({
        url: `/api/v1/lmc/${lmcId}/transactions/`,
        method: "GET",
        params,
      });
      return response.data as IPaginatedResults<ILmcTransactionRow>;
    } catch (error) {
      throw handleApiError(error);
    }
  };
}

export default LmcService;
