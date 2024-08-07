import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { jwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { Task } from '../entity/task.entity';
import { UserGuard } from '../user/guards/user.guard';
import { NotAutorGuard } from './guards/not-autor.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(jwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(req.user.id, createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get('mostVoted')
  findMostVoted() {
    return this.taskService.findMostVoted();
  }
  @Get('findNewest')
  async findNewest() {
    return await this.taskService.findNewest();
  }
  @Get('findOldest')
  async findOldest() {
    return await this.taskService.findOldest();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(+id);
  }
  @UseGuards(jwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const currentUser = req.user.id;
    const task: Task = await this.findOne(id);
    if (currentUser != task.user.id) {
      throw new BadRequestException('It is not your task');
    }
    return this.taskService.update(+id, updateTaskDto);
  }

  @UseGuards(jwtAuthGuard, UserGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: number) {
    const currentUser = req.user.id;
    const task: Task = await this.taskService.findOne(+id);
    if (currentUser != task.user.id) {
      throw new BadRequestException('Ni vase opravilo');
    }
    return this.taskService.remove(+id);
  }

  @Post('search')
  async search(@Request() req) {
    const body = await req.body;
    const { search } = body;
    return await this.taskService.activeSearch(search);
  }
}
