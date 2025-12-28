import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LostItem } from './lost.entity';
import { CreateLostDto } from './dto/create-lost.dto';
import { User } from '../users/user.entity';

@Injectable()
export class LostService {
  constructor(
    @InjectRepository(LostItem)
    private lostRepo: Repository<LostItem>,
  ) {}

  // 1. Create a new lost item
  async create(dto: CreateLostDto, user: User, file: Express.Multer.File) {
    const item = this.lostRepo.create({
      ...dto,
      createdBy: user,
      // 'imageUrl' column name use kar rahe hain taake frontend se match kare
      imageUrl: file ? file.filename : undefined, 
    });
    return this.lostRepo.save(item);
  }
  // lost.service.ts mein add karein
async findByUserId(userId: number) {
  return this.lostRepo.find({
    where: { createdBy: { id: userId } },
    order: { createdAt: 'DESC' }
  });
}
  // 2. Find all lost items (with Pagination & Search)
  async findAll(
    page = 1,
    limit = 10,
    keyword?: string,
    location?: string,
  ) {
    const qb = this.lostRepo.createQueryBuilder('lost');
    
    // User details join karna zaroori hai details page ke liye
    qb.leftJoinAndSelect('lost.createdBy', 'user'); 

    // Filter by title or description
    if (keyword) {
      qb.andWhere(
        '(lost.title ILIKE :keyword OR lost.description ILIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }

    // Filter by location
    if (location) {
      qb.andWhere('lost.location ILIKE :location', { location: `%${location}%` });
    }

    // Pagination logic
    qb.skip((page - 1) * limit)
      .take(limit)
      .orderBy('lost.createdAt', 'DESC');

    const [items, total] = await qb.getManyAndCount();

    return {
      data: items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  // 3. Find Single Item by ID (Details Page ke liye)
  async findOne(id: number) {
    const item = await this.lostRepo.findOne({
      where: { id },
      relations: ['createdBy'], // User info fetch karne ke liye
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }
}