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
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { jwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { NotAutorGuard } from '../task/guards/not-autor.guard';
import { VotingGuard } from './guards/voting.guard';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post('upvote/:id')
  @UseGuards(jwtAuthGuard, NotAutorGuard)
  create(@Param('id') task_id: number, @Request() req) {
    return this.voteService.create(req.user.id, task_id, true);
  }

  @Get()
  findAll() {
    return this.voteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voteService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voteService.remove(+id);
  }
}
