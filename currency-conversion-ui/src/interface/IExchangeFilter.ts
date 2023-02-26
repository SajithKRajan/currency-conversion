import { ExchangeType } from "./IExchange";

/**
 * The filters for fetching data from DB.
 */
export interface FilterPayload {
  /**
   * Date from
   */
  date_from: Date;
  /**
   * Date To
   */
  date_to: Date;
  /**
   * Exchange type (Live/Exchange)
   */
  type?: ExchangeType;
}
