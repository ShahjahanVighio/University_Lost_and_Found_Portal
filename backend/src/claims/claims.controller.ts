import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ClaimStatus } from './claim.entity';

@Controller('claims')
export class ClaimsController {
  constructor(private claimsService: ClaimsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateClaimDto, @Req() req) {
    return this.claimsService.create(dto, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.claimsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/:status')
  updateStatus(
    @Param('id') id: number,
    @Param('status') status: ClaimStatus,
  ) {
    return this.claimsService.updateStatus(id, status);
  }
}
