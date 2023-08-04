import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singin(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    this.logger.log(`Token Generated Successfully for ${user.email}`);

    return {
      auth_token: await this.jwtService.signAsync(payload),
    };
  }
}
