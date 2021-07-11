import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);

    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.uuid };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async create(user: User) {
    const { username, uuid: id } = await this.userService.createUser(user.username, user.name, user.password);

    return {
      access_token: this.jwtService.sign({ username, id })
    };
  }
}