import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityException } from './Basic.exception';

export class AppException extends HttpException {
  constructor(private error: HttpException) {
    // Default Response
    super('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    // For errors when un-registered property in Object
    if (error.name == 'EntityPropertyNotFoundError') {
      throw new EntityException(error);
    }
  }
}
