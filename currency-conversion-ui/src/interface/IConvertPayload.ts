/**
 * The payload model for currency conversion.
 */
export interface IConvertPayload {
  /**
   * From Currency
   */
  readonly from: string;
  /**
   * To Currency
   */
  readonly to: string;
  /**
   * Amount to be convert.
   */
  readonly amount: number;
}
