// ** Nest Modules
import { NestFactory } from '@nestjs/core';

// ** Third-party Modules
import * as winston from 'winston';
import { createLogger } from 'winston';
import { ConsoleFormatter } from 'winston-console-formatter';
import { WinstonModule } from 'nest-winston';

// ** App Modules
import { AppModule } from './app.module';

async function bootstrap() {
  const log = createLogger({
    transports: [
      // new winston.transports.Console({
      //   format: winston.format.combine(
      //     winston.format.colorize(),
      //     new ConsoleFormatter(),
      //   ),
      // }),
      new winston.transports.File({
        level: 'debug',
        filename: 'logs/app.info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger(log),
  });
  await app.listen(3000);
}
bootstrap();
