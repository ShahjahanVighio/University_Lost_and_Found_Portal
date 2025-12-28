import { Module } from '@nestjs/common';
import { FoundController } from './found.controller';
import { FoundService } from './found.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoundItem } from './found.entity';
import { LostItem } from '../lost/lost.entity';
@Module({
  imports: [TypeOrmModule.forFeature([FoundItem, LostItem])],
  controllers: [FoundController],
  providers: [FoundService]
})
export class FoundModule {}
