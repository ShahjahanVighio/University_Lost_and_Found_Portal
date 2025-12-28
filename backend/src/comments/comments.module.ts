import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { LostItem } from 'src/lost/lost.entity';
import { FoundItem } from 'src/found/found.entity';
import { Comment } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, LostItem, FoundItem])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}