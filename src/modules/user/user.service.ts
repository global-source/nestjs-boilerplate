import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'shanar',
      password: 'admin123',
    },
    {
      userId: 2,
      username: 'bala',
      password: 'admin123',
    },
    {
      userId: 3,
      username: 'kumar',
      password: 'admin123',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username == username);
  }
}
