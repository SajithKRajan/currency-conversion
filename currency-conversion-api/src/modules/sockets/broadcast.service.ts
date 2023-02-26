import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { SocketEvents } from './events';
import { FilterPayload } from '../exchange/filter.payload';
import { ExchangeService } from '../exchange/exchange.service';
import { ScheduleTaskService } from '../scheduler/schedule.service';

@Injectable()
export class BroadcastService {
  constructor(
    private exchangeService: ExchangeService,
    private scheduler: ScheduleTaskService,
  ) {}
  /**
   *
   * @param server
   * @param userId
   * @param filters
   */
  startSubscribingLiveData(
    server: Server,
    userId: string,
    filters: FilterPayload,
  ) {
    const fetchLiveDataJob = () => {
      this.exchangeService.getAll(filters).then((data) => {
        server.in(userId).emit(SocketEvents.send, data);
      });
    };
    this.scheduler.addTask(userId, fetchLiveDataJob);
  }

  /**
   *
   * @param server
   * @param userId
   * @param filters
   */
  stopSubscribingLiveData(userId: string) {
    this.scheduler.deleteTask(userId);
  }
}
