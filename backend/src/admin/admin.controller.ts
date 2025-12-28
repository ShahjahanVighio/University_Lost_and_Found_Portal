import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/role.enum';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('claims')
  getAllClaims() {
    return this.adminService.getAllClaims();
  }

  @Patch('claims/:id/approve')
  approveClaim(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.approveClaim(id);
  }

  @Patch('claims/:id/reject')
  rejectClaim(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.rejectClaim(id);
  }

  @Delete('lost/:id')
  deleteLostItem(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteLostItem(id);
  }

  @Delete('found/:id')
  deleteFoundItem(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteFoundItem(id);
  }
}
