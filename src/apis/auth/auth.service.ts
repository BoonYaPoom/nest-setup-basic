import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // ฟังก์ชันสำหรับสร้าง JWT
  async login(user: any) {
    const payload = { username: user.username, sub: user.sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // ฟังก์ชันสำหรับตรวจสอบ JWT
  async validateUser(token: string) {
    const decoded = this.jwtService.verify(token); // ตรวจสอบ JWT
    return decoded;
  }
}
