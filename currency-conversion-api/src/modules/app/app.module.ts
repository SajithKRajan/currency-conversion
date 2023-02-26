import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { ExchangeModule } from '../exchange/exchange.module';
import { SocketModule } from '../sockets/socket.module';
import { LiveCurrencyModule } from '../live-currency/live.currency.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `${process.env.NODE_ENV || ''}.env`,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.debug(
          'MongoDB Url: ',
          `mongodb://${configService.get('DB_HOST')}:${configService.get(
            'DB_PORT',
          )}/${configService.get('DB_NAME')}`,
        );
        return {
          uri: `mongodb://${configService.get('DB_HOST')}:${configService.get(
            'DB_PORT',
          )}/${configService.get('DB_NAME')}`,
        } as MongooseModuleAsyncOptions;
      },
    }),
    ConfigModule,
    LiveCurrencyModule,
    SchedulerModule,
    ExchangeModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
