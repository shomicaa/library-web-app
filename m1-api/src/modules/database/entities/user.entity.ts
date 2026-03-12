import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

export type UserId = string & { __brand: 'User' };

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column({ name: 'username', type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'role', type: 'varchar', default: UserRole.USER })
  role: UserRole;
}
