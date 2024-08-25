import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entity/task.entity';
import { CategoriesService } from '../categories/categories.service';
import { Category } from "../entity/category.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [TaskController],
  providers: [TaskService, CategoriesService],
  exports: [TaskService],
})
export class TaskModule {}
