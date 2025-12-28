import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: { text: string; itemId: number; itemType: 'lost' | 'found' }, @Req() req) {
    const comment = this.commentRepo.create({
      ...body,
      user: req.user,
    });
    return this.commentRepo.save(comment);
  }

  @Get(':type/:id')
  async findAll(@Param('type') type: 'lost' | 'found', @Param('id') id: number) {
    return this.commentRepo.find({
      where: { itemType: type, itemId: id },
      order: { createdAt: 'DESC' },
    });
  }
}