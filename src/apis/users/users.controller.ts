import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/middleware/auth-guard';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'notify-requester' })
  @ApiBearerAuth('access-token')
  @ApiBearerAuth('api-key')
  getAllUsers() {
    const data = this.usersService.findAll();
    return {
      status: 'success',
      message: 'Users successfully',
      data: data,
    };
  }
}
