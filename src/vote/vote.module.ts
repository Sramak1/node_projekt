import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from '../entity/vote.entity';
import { TaskService } from '../task/task.service';
import { Task } from '../entity/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), TypeOrmModule.forFeature([Task])],
  controllers: [VoteController],
  providers: [VoteService, TaskService],
})
export class VoteModule {}
