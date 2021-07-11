import { Request, UseGuards, Controller, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get("find")
  findUser(@Request() req) {
    return req.user;
  }
}