import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class ScheduleTaskService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
  ) {}

  addTask(name: string, job: () => void) {
    const seconds =
      (this.configService.get('LIVE_DATA_REFRESH_TIME') || 60) * 1000;
    const interval = setInterval(job, seconds);
    this.schedulerRegistry.addInterval(name, interval);
    console.debug(`job ${name} added!`);
  }

  deleteTask(name: string) {
    try {
      if (this.schedulerRegistry.getInterval(name)) {
        this.schedulerRegistry.deleteInterval(name);
        console.debug(`job ${name} deleted!`);
      }
    } catch (err) {
      console.debug(`User with socket ${name} is not subscribed`);
    }
  }
}
