import { Module } from '@nestjs/common';
import config from './db.env';
import { DBConfigService } from './db.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  providers: [ConfigService, DBConfigService],
  exports: [ConfigService, DBConfigService],
})
export class DBConfigModule {}
