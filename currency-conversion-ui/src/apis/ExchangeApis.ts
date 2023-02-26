import axios from "axios";
import { IExchange } from "../interface/IExchange";
import { FilterPayload } from "../interface/IExchangeFilter";

/**
 * The API for save exchange details in to DB.
 * @param payload
 * @returns
 */
export const save = async (payload: IExchange): Promise<number> => {
  return (await axios.post("exchange", payload)).data;
};

/**
 * The API for getting exchange details from DB.
 * @param payload
 * @returns
 */
export const getExchangeData = async (
  payload: FilterPayload
): Promise<IExchange[]> => {
  return (await axios.get("exchange", { params: payload })).data;
};
