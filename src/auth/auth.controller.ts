import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Post('signin')
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Request() req) {
    return this.authService.create(req.body);
  }
};