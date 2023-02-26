import { Module } from '@nestjs/common';
import { LiveCurrencyController } from './live.currency.controller';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { LiveCurrencyMockService } from './services/live.currency.mock.service';
import { CoinLayerDataService } from './services/live.currency.coinlayer.service';

const LiveCurrencyServiceFactory = {
  provide: 'LiveCurrencyServiceFactory',
  useFactory: (configService: ConfigService) => {
    const env = configService.get('APP_ENV');
    return env === 'dev'
      ? new LiveCurrencyMockService()
      : new CoinLayerDataService(configService);
  },
  imports: [ConfigModule],
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule],
  controllers: [LiveCurrencyController],
  providers: [LiveCurrencyServiceFactory],
  exports: [LiveCurrencyServiceFactory],
})
export class LiveCurrencyModule {}
