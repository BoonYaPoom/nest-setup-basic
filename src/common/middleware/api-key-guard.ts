import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const apiKey = request.headers['x-api-key'];

    // ตรวจสอบว่า API key ถูกรวมอยู่ใน header และถูกต้องหรือไม่
    if (!apiKey) {
      throw new ForbiddenException('API key is missing'); // ถ้าไม่มี API key
    }

    if (apiKey !== 'your-api-key-here') {
      throw new ForbiddenException('Invalid API key'); // ถ้า API key ไม่ถูกต้อง
    }

    return true; // ถ้า API key ถูกต้อง
  }
}
