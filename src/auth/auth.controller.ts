import { Controller, Get, Post, Res, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { jwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);
    res.setHeader('Set-Cookie', token).json();
  }

  @UseGuards(jwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }

  @UseGuards(jwtAuthGuard)
  @Get('logout')
  async logout(@Res() res: Response) {
    try {
      res
        .setHeader('Set-Cookie', 'Access_token=; HttpOnly; Path =/; Max-Age=0;')
        .sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  }
}
