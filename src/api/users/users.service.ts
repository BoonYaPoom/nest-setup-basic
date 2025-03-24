import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, name: 'John Doe was', sub: 1 },
    { id: 2, name: 'Jane Doe', sub: 2 },
  ];

  findAll() {
    return this.users;
  }
  findOne(sub: number) {
    return this.users.find((item) => item.sub === sub);
  }
}
