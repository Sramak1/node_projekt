import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareHash } from '../utils/bcrypt';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userFromRequest: User) {
    const { password, ...user } = await this.userService.findById(
      userFromRequest.id,
    );
    if (!user) {
      throw new NotFoundException('User email does not exist');
    }
    // if (!(await compareHash(password, userFromRequest.password))) {
    //   throw new BadRequestException('Password missmatch!');
    // }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const tokenString = `Access_token=${accessToken};HttpOnly;Path=/;Max-Age=1d`;
    return tokenString;
  }
  async validateUser(email: string, password: string): Promise<User> {
    console.log('Validating user...');
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!(await compareHash(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    console.log('User is valid');
    return user;
  }
}
