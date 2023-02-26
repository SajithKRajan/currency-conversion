/**
 *  ICurrencyModel - The live currency info model.
 */
export interface ICurrencyModel {
  /**
   * Currency Symbol
   */
  readonly symbol: string;
  /**
   * Currency Name
   */
  readonly name: string;
  /**
   * Currency Full Name
   */
  readonly name_full: string;
  /**
   * Currency Max Supply
   */
  readonly max_supply?: number;
  /**
   * Currency Icon URL
   */
  readonly icon_url?: string;
}
