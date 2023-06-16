import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Task } from '../entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(user_id: number, createTaskDto: CreateTaskDto) {
    const data = {
      ...createTaskDto,
      user: { id: user_id },
      category: { id: createTaskDto.category_id },
    };
    const task = this.taskRepository.create(data);
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.taskRepository.delete(id);
  }
}
