import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleTaskService } from './schedule.service';

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule],
  providers: [ScheduleTaskService],
  exports: [ScheduleTaskService],
})
export class SchedulerModule {}
