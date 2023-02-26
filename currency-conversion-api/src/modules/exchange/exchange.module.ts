import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeController } from './exchange.controller';
import { ExchangeSchema } from './exchange.model';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Exchange', schema: ExchangeSchema }]),
  ],
  controllers: [ExchangeController],
  providers: [ExchangeService],
  exports: [ExchangeService],
})
export class ExchangeModule {}
