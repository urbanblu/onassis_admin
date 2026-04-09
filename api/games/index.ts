import Axios from "@/api";
import {
  IDrawEventTicketsResponse,
  IDrawsWinningsTableRow,
  IGameType,
} from "@/interfaces/games.interface";
import { IPaginatedResults } from "@/interfaces/writers.interface";
import { handleApiError } from "@/utils/api_error";

export type DrawsWinningsTableParams = {
  game_type?: string;
  status?: string;
  draw_date?: string;
  draw_date__gte?: string;
  draw_date__lte?: string;
  page?: number;
  page_size?: number;
};

class GamesService {
  static fetchGameTypes = async (params?: {
    is_active?: boolean;
    code?: string;
  }): Promise<IGameType[]> => {
    try {
      const response = await Axios({
        url: `/api/v1/games/types/`,
        method: "GET",
        params,
      });
      return response.data as IGameType[];
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static fetchDrawsAndWinningsTable = async (
    params?: DrawsWinningsTableParams,
  ): Promise<IPaginatedResults<IDrawsWinningsTableRow>> => {
    try {
      const response = await Axios({
        url: `/api/v1/games/events/draws-and-winnings/`,
        method: "GET",
        params,
      });
      return response.data as IPaginatedResults<IDrawsWinningsTableRow>;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  static fetchDrawEventTickets = async (
    eventId: string,
    params?: { search?: string; page?: number; page_size?: number },
  ): Promise<IDrawEventTicketsResponse> => {
    try {
      const response = await Axios({
        url: `/api/v1/games/events/${eventId}/tickets/`,
        method: "GET",
        params,
      });
      return response.data as IDrawEventTicketsResponse;
    } catch (error) {
      throw handleApiError(error);
    }
  };
}

export default GamesService;
