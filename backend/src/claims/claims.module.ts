import { Module } from '@nestjs/common';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claim } from './claim.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Claim])],
  controllers: [ClaimsController],
  providers: [ClaimsService]
})
export class ClaimsModule {}
