import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtGuard,
    // },
  ],
})
export class UsersModule {}
