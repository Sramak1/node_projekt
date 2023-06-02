import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { NotBrackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dto/create-user.dto';
import { hash } from 'utils/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async create(CreateUserDto: createUserDto): Promise<User> {
    const user = await this.findByEmail(createUserDto.name);
    if (user) {
      throw new BadRequestException('email že obstaja');
    }
    const hashed = await hash(CreateUserDto.password, 10);
    const data = { ...CreateUserDto, password: hashed };
    const newUser = this.userRepository.create(data);
    return this.userRepository.save(newUser);
  }
  async delete(id: number) {
    return this.userRepository.delete(id);
  }
  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findById(id);
  }
}
