import { Module } from '@nestjs/common';
import { ExchangeModule } from '../exchange/exchange.module';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { BroadcastService } from './broadcast.service';
import { SocketsGateway } from './sockets.gateway';

@Module({
  imports: [ExchangeModule, SchedulerModule],
  providers: [SocketsGateway, BroadcastService],
})
export class SocketModule {}
