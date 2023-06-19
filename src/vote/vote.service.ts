import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from '../entity/vote.entity';
import { TaskService } from '../task/task.service';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    private taskService: TaskService,
  ) {}
  create(user_id: number, task_id: number, value: boolean) {
    const data = {
      value,
      task: { id: task_id },
      user: { id: user_id },
    };
    console.log(data);
    // return this.voteRepository.save(data).then(() => {
    //   const karma = data.task.karma + 1;
    //   return this.taskService.update(data.task.id, { karma });
    // });
  }

  findAll() {
    return `This action returns all vote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
