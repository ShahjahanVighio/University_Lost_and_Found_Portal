import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { LostService } from './lost.service';
import { LostController } from './lost.controller';
import { LostItem } from './lost.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LostItem]),
    MulterModule.register({
      dest: './uploads', // folder to store uploaded images
    }),
  ],
  controllers: [LostController],
  providers: [LostService],
  exports: [LostService],
})
export class LostModule {}
