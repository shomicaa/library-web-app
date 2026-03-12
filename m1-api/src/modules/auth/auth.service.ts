import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { UserRole } from '../database/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    return this.userService.create(username, password);
  }

  async registerAdmin(username: string, password: string, adminSecret: string) {
    if (adminSecret !== process.env.ADMIN_SECRET) {
      throw new ForbiddenException('Invalid admin secret');
    }
    return this.userService.create(username, password, UserRole.ADMIN);
  }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      sub: user.id,
      username: user.username,
      role: user.role,
    });
    return { access_token: token };
  }

  async logout() {
    // JWT is stateless — client should discard the token
    return { message: 'Logged out successfully' };
  }
}
