import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from '../entity/vote.entity';
import { TaskService } from '../task/task.service';
import { Task } from '../entity/task.entity';
import { Category } from "../entity/category.entity";
import { CategoriesService } from "../categories/categories.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [VoteController],
  providers: [VoteService, TaskService, CategoriesService],
  exports: [VoteService],
})
export class VoteModule {}
