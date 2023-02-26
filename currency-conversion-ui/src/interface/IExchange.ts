/**
 * The exchane type enum.
 */
export enum ExchangeType {
  "LIVE",
  "EXCHANGE",
  "ALL",
}

/**
 * The exchange record model.
 */
export interface IExchange {
  readonly currency_from: string;
  readonly currency_to: string;
  readonly amount_from: number;
  readonly amount_to: number;
  readonly type?: ExchangeType;
  readonly date_time?: Date;
}
