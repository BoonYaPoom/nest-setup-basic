import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/apis/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ดึง JWT จาก Authorization header
      secretOrKey: process.env.JWT_SECRET, // ใช้ secret จาก .env
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub); // ค้นหาผู้ใช้จาก payload
    if (!user) {
      throw new Error('User not found');
    }
    return user; // ส่งข้อมูลผู้ใช้
  }
}
