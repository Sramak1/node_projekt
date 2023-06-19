import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: boolean;

  @ManyToOne(() => Task, (task) => task.votes)
  task: Task;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;
}
