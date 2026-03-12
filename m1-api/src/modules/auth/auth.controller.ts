import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

class RegisterAdminDto extends CreateUserDto {
  adminSecret: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // /api/auth/register
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto.username, dto.password);
  }

  @Post('register-admin') // /api/auth/register-admin
  async registerAdmin(@Body() dto: RegisterAdminDto) {
    return this.authService.registerAdmin(dto.username, dto.password, dto.adminSecret);
  }

  @Post('login') // /api/auth/login
  async login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @Post('logout') // /api/auth/logout
  @UseGuards(JwtAuthGuard)
  async logout() {
    return this.authService.logout();
  }
}
