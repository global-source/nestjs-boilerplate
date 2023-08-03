import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singin(username: string, padd: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user?.password !== padd) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    // const { password, ...result } = user;
    // return result;
    return {
      auth_token: await this.jwtService.signAsync(payload),
    };
  }
}
