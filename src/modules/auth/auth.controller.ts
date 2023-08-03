import {
  Controller,
  Body,
  Post,
  HttpStatus,
  HttpCode,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // To Allow public access
  @Public()
  // To Enforce 200 instead of 201, on creating new token
  @HttpCode(HttpStatus.OK)
  @Post('login')
  singIn(@Body() signInDto: Record<string, any>) {
    return this.authService.singin(signInDto.username, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
