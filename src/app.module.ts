import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './apis/auth/auth.module';
import { UsersModule } from './apis/users/users.module';
import { UsersService } from './apis/users/users.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './common/config/jwt-strategy';
import { ApiKeyGuard } from './common/middleware/api-key-guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
