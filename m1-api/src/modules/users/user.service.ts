import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from '../database/entities/user.entity';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private toModel(entity: UserEntity): UserModel {
    return { id: entity.id, username: entity.username, role: entity.role };
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id: id as any } });
  }

  async getAll(): Promise<UserModel[]> {
    const users = await this.userRepository.find();
    return users.map((u) => this.toModel(u));
  }

  async create(
    username: string,
    password: string,
    role: UserRole = UserRole.USER,
  ): Promise<UserModel> {
    const existing = await this.findByUsername(username);
    if (existing) throw new ConflictException('Username already taken');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashed, role });
    const saved = await this.userRepository.save(user);
    return this.toModel(saved);
  }

  async update(
    id: string,
    data: { username?: string; password?: string },
  ): Promise<UserModel> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (data.username) user.username = data.username;
    if (data.password) user.password = await bcrypt.hash(data.password, 10);

    const saved = await this.userRepository.save(user);
    return this.toModel(saved);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.remove(user);
  }
}
