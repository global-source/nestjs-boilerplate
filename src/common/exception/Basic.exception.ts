import { HttpException, HttpStatus } from '@nestjs/common';

export class BasicException extends HttpException {
  constructor() {
    super('Attempt Exceed', HttpStatus.MOVED_PERMANENTLY);
  }
}

export class EntityException extends HttpException {
  constructor(private error: HttpException) {
    // Default Response
    super({}, HttpStatus.UNPROCESSABLE_ENTITY);
    const res = {
      error: error.name,
      message: [this.getErrorMessage(error.message)],
    };
    throw new HttpException(res, HttpStatus.UNPROCESSABLE_ENTITY);
  }
  /**
   * Converting the lengthy error message to simplified one
   * From: "Property \"test2\" was not found in \"Label\". Make sure your query is correct."
   * To: "Property \"test2\" was not found in \"Label\""
   * @param message Error message
   * @returns Simplified error message
   */
  getErrorMessage(message: string) {
    // Parse the message to an readable format
    let res = message;
    if (res.includes('.')) {
      // Split the message by '.' and take first portion of it
      res = res.split('.')[0];
    }
    return res;
  }
}
