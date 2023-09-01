import { Injectable } from '@nestjs/common';
import { User } from 'src/common/entities/user.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UserInterface from 'src/common/interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  // Fetch a ll Users
  async getAll(): Promise<User[]> {
    return this.user.find();
  }

  // Create new User
  async create(data: User): Promise<User> {
    return this.user.save(data);
  }

  // Update existing User by ID
  async update(id: number, data: User): Promise<UpdateResult> {
    return this.user.update(id, data);
  }

  // Delete existing User by ID
  async delete(id: number): Promise<DeleteResult> {
    return this.user.delete(id);
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.user.findOne({ where: { email: email } });
  }

  async isActive(email: string): Promise<boolean> {
    return (await this.user.findOne({
      where: { email: email, deleted_at: null },
    }))
      ? true
      : false;
  }
}
