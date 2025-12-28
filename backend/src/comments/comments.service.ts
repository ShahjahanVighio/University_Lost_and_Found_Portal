import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { FoundItem } from 'src/found/found.entity';
import { LostItem } from 'src/lost/lost.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(LostItem)
    private readonly lostRepository: Repository<LostItem>,
    @InjectRepository(FoundItem)
    private readonly foundRepository: Repository<FoundItem>,
  ) {}

  async create(createCommentDto: any, user: User) {
    const { text, itemId, itemType } = createCommentDto;

    // 1. Check karein ke item exist karta hai ya nahi
    if (itemType === 'lost') {
      const item = await this.lostRepository.findOne({ where: { id: itemId } });
      if (!item) throw new NotFoundException('Lost item not found');
    } else {
      const item = await this.foundRepository.findOne({ where: { id: itemId } });
      if (!item) throw new NotFoundException('Found item not found');
    }

    // 2. Comment create karein
    const comment = this.commentRepository.create({
      text,
      itemId,
      itemType,
      user, // Login user ki details
    });

    return await this.commentRepository.save(comment);
  }

  // Function ke parameters mein 'itemType' ko strict kar dein
async findByItem(itemType: 'lost' | 'found', itemId: number) {
  return await this.commentRepository.find({
    where: { 
      itemType: itemType as any, // 'as any' ya 'as "lost" | "found"' likhne se error chala jayega
      itemId: itemId 
    },
    relations: ['user'],
    order: { createdAt: 'DESC' },
  });
}
}