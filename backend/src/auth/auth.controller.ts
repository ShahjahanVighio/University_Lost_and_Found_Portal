import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { LostService } from '../lost/lost.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private lostService: LostService
  ) {}
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }
  @Get('me/items')
@UseGuards(JwtAuthGuard)
async getMyItems(@Req() req) {
  // Yahan aap service se data return karein
  return this.lostService.findByUserId(req.user.id);
}
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  @UseGuards(JwtAuthGuard)
@Get('me')
me(@Req() req) {
  return req.user;
}
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Get('admin-only')
adminOnly() {
  return { message: 'Welcome Admin' };
}


}
