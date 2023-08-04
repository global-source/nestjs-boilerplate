import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  // Logger instance
  private readonly logger = new Logger(AuthGuard.name);

  // Auth Constructor
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // Fetch Auth Request token
    const token = this.extractToken(req);

    // Fetch route public status
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If Public route allow directly,
    if (isPublic) {
      return true;
    }

    // If Token not exist, then don't allow
    if (!token) {
      this.logger.error('Unauthorized Access | Token Missing');
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants,
      });
      req['user'] = payload;
    } catch (err) {
      this.logger.error('Unauthorized Access', err);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractToken(request: Request): string | false {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type == 'Bearer' ? token : false;
  }
}
