import { UserId, UserRole } from '../database/entities/user.entity';

export interface UserModel {
  id: UserId;
  username: string;
  role: UserRole;
}
