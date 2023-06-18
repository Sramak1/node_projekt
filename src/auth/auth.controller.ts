import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
//import {LocalAuthGuard} from "./guards/localAuth.guard";
import { Response } from 'express';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { jwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req, @Res() res: Response) {
    const jwt = req.user;
    res.setHeader('Set-Cookie', [jwt]).json();
  }

  @UseGuards(jwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }

  @UseGuards(jwtAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res
      .setHeader('Set-Cookie', `Access_token=;HttpOnly;Path=/;Max-Age=0`)
      .sendStatus(200);
  }
}
