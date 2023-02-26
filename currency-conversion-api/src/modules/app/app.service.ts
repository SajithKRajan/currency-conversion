import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExchangeService } from '../exchange/exchange.service';
import { LiveCurrencyService } from '../live-currency/services/live.currency.service';
import { ScheduleTaskService } from '../scheduler/schedule.service';

@Injectable()
export class AppService {
  /**
   * Constructor
   * @param {ConfigService} configService configuration service
   */
  constructor(
    private configService: ConfigService,
    private scheduleTaskService: ScheduleTaskService,
    @Inject('LiveCurrencyServiceFactory')
    private readonly currencyService: LiveCurrencyService,
    private exchangeService: ExchangeService,
  ) {
    this._updateLiveDataInDB();
  }

  /**
   * The method for fetch live data from external/mock api and store in to DB by a configured time interval.
   */
  private _updateLiveDataInDB() {
    const getLiveRateCallBack = () => {
      this.currencyService.getLiveRate().then((data) => {
        for (let i = 0; i < 10; i++) {
          this.exchangeService.create(data[i]).catch((err) => {
            console.error(err);
          });
        }
      });
    };
    this.scheduleTaskService.addTask('live-rate-update', getLiveRateCallBack);
  }

  /**
   * Fetches and logs the APP_URL environment variable from the configuration file.
   * @returns {string} the application url
   */
  root(): string {
    const appURL = this.configService.get('APP_URL');
    return appURL;
  }
}
