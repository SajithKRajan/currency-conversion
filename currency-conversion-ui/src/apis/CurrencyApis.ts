import axios from "axios";
import { IConvertPayload } from "../interface/IConvertPayload";
import { ICurrencList } from "../interface/ICurrencyList";

/**
 * The api for fetching all currency list.
 * @returns - List of all currencies.
 */
export const fetchAllCurrencies = async (): Promise<ICurrencList> => {
  return (await axios.get("live_currency")).data;
};

/**
 * The api for convert one currency from another.
 * @param payload - The input for convertion.
 * @returns - The converted result.
 */
export const convert = async (payload: IConvertPayload): Promise<number> => {
  return (await axios.get("live_currency/convert", { params: payload })).data
    .result;
};
