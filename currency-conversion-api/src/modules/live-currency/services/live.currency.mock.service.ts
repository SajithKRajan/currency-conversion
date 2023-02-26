import { Injectable } from '@nestjs/common';
import { LiveRateConversionPayload } from '../payloads/live.currency.rate.payload';
import { LiveCurrencyService, ICurrencies } from './live.currency.service';
import * as currencyList from '../../../mockdata/list.json';
import * as liveRate from '../../../mockdata/live.data.json';
import { Exchange } from 'src/modules/exchange/exchange.model';

/**
 * The mock service for manage live data request.
 */
@Injectable()
export class LiveCurrencyMockService extends LiveCurrencyService {
  getAllCurrencies(): Promise<ICurrencies> {
    return new Promise((resolve) => {
      resolve(this._convertToCurrencyModel(currencyList));
    });
  }

  getLiveRate(): Promise<Exchange[]> {
    return new Promise((resolve) => {
      const liveExchangeRate = this._convertToExchangeModel(liveRate);
      resolve(liveExchangeRate);
    });
  }

  convert(payload: LiveRateConversionPayload): Promise<{ result: number }> {
    return new Promise((resolve) => {
      resolve({ result: payload.amount * Math.random() * 500 + 100 });
    });
  }
}
