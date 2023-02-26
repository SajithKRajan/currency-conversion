import { ICurrencyModel } from "./ICurrency";

/**
 * The interface for currency list model.
 */
export interface ICurrencList {
  /**
   * Crypto currency list
   */
  crypto: ICurrencyModel[];
  /**
   * Fiat currecncy list
   */
  fiat: ICurrencyModel[];
}
