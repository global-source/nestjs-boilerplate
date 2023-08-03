import { ValidationPipe } from '@nestjs/common';

export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      forbidNonWhitelisted: true,
    });
  }
}
