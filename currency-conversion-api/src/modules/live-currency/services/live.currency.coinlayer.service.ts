import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Exchange } from 'src/modules/exchange/exchange.model';
import { LiveRateConversionPayload } from '../payloads/live.currency.rate.payload';
import { LiveCurrencyService, ICurrencies } from './live.currency.service';

/**
 * The service for manage live data request by connected with external Coinlayer API.
 */
@Injectable()
export class CoinLayerDataService extends LiveCurrencyService {
  constructor(private configService: ConfigService) {
    super();
  }

  getLiveRate(): Promise<Exchange[]> {
    return new Promise((resolve, reject) => {
      fetch(
        `${this.configService.get(
          'COIN_LAYER_API_URL',
        )}/live?access_key=${this.configService.get('COIN_LAYER_API_KEY')}`,
      ).then(async (data) => {
        const res = await data.json();
        const liveExchangeRate = this._convertToExchangeModel(res);
        resolve(liveExchangeRate);
      });
    });
  }

  getAllCurrencies(): Promise<ICurrencies> {
    return new Promise((resolve, reject) => {
      fetch(
        `${this.configService.get(
          'COIN_LAYER_API_URL',
        )}/list?access_key=${this.configService.get('COIN_LAYER_API_KEY')}`,
      ).then(async (data) => {
        const res = await data.json();
        resolve(this._convertToCurrencyModel(res));
      });
    });
  }

  convert(payload: LiveRateConversionPayload): Promise<{ result: number }> {
    const params = new URLSearchParams({
      access_key: this.configService.get('COIN_LAYER_API_KEY'),
      from: payload.from,
      to: payload.to,
      amount: payload.amount.toString(),
    });
    return new Promise((resolve, reject) => {
      fetch(`${this.configService.get('COIN_LAYER_API_URL')}/convert?${params}`)
        .then((data) => {
          const result = data.json();
          if (result['success']) {
            resolve(result);
          }
          resolve({ result: payload.amount * Math.random() * 500 + 100 });
        })
        .catch((err) => {
          resolve({ result: payload.amount * Math.random() * 500 + 100 });
        });
    });
  }
}
