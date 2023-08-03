import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBProvider } from './config/db/db.provider';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';

const appModules = [
  // Authentication
  AuthModule,
  // User
  UserModule,
];

const coreModules = [
  // PostgreSQL DB
  DBProvider,
];

@Module({
  imports: [...appModules, ...coreModules],
  controllers: [AppController],
  providers: [
    AppService,
    // FileLoggerService,
    {
      // Global auth restriction
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
