import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { User } from '../models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async findUser(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  async createUser(username: string, name: string, password: string): Promise<User> {
    const user = await this.findUser(username);

    const userRepository = new User();

    userRepository.name = name;
    userRepository.username = username;
    userRepository.password = password;

    const errors = await validate(userRepository);

    if(user) throw new UnauthorizedException();

    if(errors.length > 0) throw new UnauthorizedException(errors.map(e => e.constraints.isLength));

    return this.usersRepository.save(userRepository);
  }
};