import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DBConfigModule } from './db.module';
import { DBConfigService } from './db.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DBConfigModule],
      useFactory: async (dbConfigService: DBConfigService) => ({
        type: 'postgres' as DatabaseType,
        host: dbConfigService.host,
        port: dbConfigService.port,
        username: dbConfigService.user,
        password: dbConfigService.password,
        name: dbConfigService.name,
        database: dbConfigService.name,
        synchronize: true, // Only on Dev
        entities: [],

        autoLoadEntities: true,

        replication: {
          master: {
            host: dbConfigService.host,
            port: dbConfigService.port,
            username: dbConfigService.user,
            password: dbConfigService.password,
            database: dbConfigService.name,
          },
          slaves: [
            {
              host: dbConfigService.host,
              port: dbConfigService.port,
              username: dbConfigService.user,
              password: dbConfigService.password,
              database: dbConfigService.name,
            },
          ],

          selector: 'RR',
        },
      }),
      inject: [DBConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class DBProvider {}
