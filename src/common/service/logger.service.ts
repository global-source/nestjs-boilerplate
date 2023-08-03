import { Logger, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { ConsoleFormatter } from 'winston-console-formatter';
import * as fs from 'fs';

@Injectable()
export class FileLoggerService extends Logger {
  private readonly logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            new ConsoleFormatter(),
          ),
        }),
        new winston.transports.File({
          level: 'info',
          filename: 'logs/app.info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    });
  }
  log(message: string, context?: string) {
    super.log(message, { context });
    this.logger.info(message, { context });
  }

  info(message: string, context?: string) {
    super.log(message, { context });
    this.logger.log(message, { context });
  }
  warning(message: string, context?: string) {
    this.logger.warning(message, { context });
  }
  error(message: string, context?: string) {
    this.logger.error(message, { context });
  }
}
