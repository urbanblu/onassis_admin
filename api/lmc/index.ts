import Axios from "@/api";
import {
  IAvailableLmcOwner,
  ILmcDetailCard,
  ILmcRegisterResponse,
  ILmcTransactionRow,
  ILmcTransactionsParams,
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

  static fetchWritersOverview = async (
    lmcId: string,
    params?: WritersOverviewParams,
  ): Promise<unknown> => {
    try {
      const response = await Axios({
        url: `/api/v1/lmc/${lmcId}/writers-overview/`,
        method: "GET",
        params,
      });
      return response.data;
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
