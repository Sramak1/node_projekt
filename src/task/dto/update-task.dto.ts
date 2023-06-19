import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  karma?: number;

  @IsOptional()
  category_id?: number;
}
