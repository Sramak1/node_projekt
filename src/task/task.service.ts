import { BadRequestException, Injectable, InternalServerErrorException, Param } from "@nestjs/common";
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Task } from '../entity/task.entity';
import { User } from '../entity/user.entity';
import { CategoriesService } from "../categories/categories.service";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private category_service: CategoriesService,
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
    return await this.taskRepository.find({ relations: ['user', 'category'] });
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['user', 'category'],
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.findOne(id);
      const category = await this.category_service.findOne(
        updateTaskDto.category_id,
      );
      for (const key in task) {
        if (updateTaskDto[key] !== undefined) {
          task[key] = updateTaskDto[key];
        }
      }
      task.category = category;
      return this.taskRepository.save(task);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Something went wrong while updating the task.',
      );
    }
  }

  remove(id: number): Promise<DeleteResult> {
    return this.taskRepository.delete(id);
  }
  findMostVoted() {
    return this.taskRepository.find({
      order: { karma: 'desc' },
      relations: ['user', 'category'],
    });
  }
  async findNewest() {
    const findenew = await this.taskRepository.find({
      order: { created_at: 'desc' },
      relations: ['user', 'category'],
    });
    console.log(findenew);
    return findenew;
  }
  async findOldest() {
    const findold = await this.taskRepository.find({
      order: { created_at: 'asc' },
      relations: ['user', 'category'],
    });
    return findold;
  }
  async activeSearch(search: string): Promise<Task[]> {
    const searchExist: Task[] = [];
    const tasks = await this.findAll();
    tasks.forEach((task: Task) => {
      if (task.title.includes(search)) {
        searchExist.push(task);
      }
    });
    return searchExist;
  }
}
