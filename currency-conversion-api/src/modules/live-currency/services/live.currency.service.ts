import { Exchange, ExchangeType } from 'src/modules/exchange/exchange.model';
import { ICurrencyModel } from '../live.currency.model';
import { LiveRateConversionPayload } from '../payloads/live.currency.rate.payload';

export interface ICurrencies {
  crypto: ICurrencyModel[];
  fiat: ICurrencyModel[];
}
/**
 *  The abstract class for Live Data Service.
 */
export abstract class LiveCurrencyService {
  /**
   * Fetches all currencies from
   * @returns {Promise<ICurrencies>} queried currencies data.
   */
  abstract getAllCurrencies(): Promise<ICurrencies>;

  /**
   * Convert amount between any one cryptocurrency and standard (fiat) currency.
   * @param payload
   * @returns {{ result: number }} Returns the conversion result.
   */
  abstract convert(
    payload: LiveRateConversionPayload,
  ): Promise<{ result: number }>;

  /**
   * Fetches all latest crypto rates for all available in USD.
   * @returns {Promise<IExchange>} queried rates.
   */
  abstract getLiveRate(): Promise<Exchange[]>;

  /**
   * The method for convert api response to currency model.
   * @param response - the response from live data service.
   * @returns Converted model.
   */
  _convertToCurrencyModel(response: any): ICurrencies {
    const crypto: ICurrencyModel[] = [];
    const fiat: ICurrencyModel[] = [];
    if (response.crypto) {
      for (const [, value] of Object.entries(response.crypto)) {
        crypto.push(value as ICurrencyModel);
      }
    }
    if (response.fiat) {
      for (const [key, value] of Object.entries(response.fiat)) {
        fiat.push({
          name: key,
          name_full: value as string,
          symbol: key,
        });
      }
    }
    return { crypto, fiat };
  }

  /**
   * The method for convert api response to exchange model.
   * @param response - The live data from live data service.
   * @returns Converted model.
   */
  _convertToExchangeModel(response: any): Exchange[] {
    const exhchangeRates: Exchange[] = [];
    if (response.rates) {
      for (const [key, value] of Object.entries(response.rates)) {
        exhchangeRates.push({
          currency_from: key,
          currency_to: response.target,
          amount_from: 1,
          amount_to: value as number,
          date_time: new Date(),
          type: ExchangeType.LIVE,
        });
      }
    }
    return exhchangeRates;
  }
}
