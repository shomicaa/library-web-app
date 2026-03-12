import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { UpdateUserDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../database/entities/user.entity';

// Only admins can manage users
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // /api/users
  async getAll(): Promise<UserModel[]> {
    return this.userService.getAll();
  }

  @Patch(':id') // /api/users/:id
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.update(id, dto);
  }

  @Delete(':id') // /api/users/:id
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
