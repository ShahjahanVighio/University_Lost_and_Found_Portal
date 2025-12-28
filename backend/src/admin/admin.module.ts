import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../users/user.entity';
import { Claim } from '../claims/claim.entity';
import { LostItem } from '../lost/lost.entity';
import { FoundItem } from '../found/found.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Claim, LostItem, FoundItem]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
