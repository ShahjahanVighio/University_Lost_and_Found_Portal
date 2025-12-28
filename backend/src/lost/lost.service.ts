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

  // STATUS UPDATE METHOD (Fix: lostRepo use kiya hai)
  async updateStatus(id: number, status: string) {
    const item = await this.findOne(id); // Check if exists
    await this.lostRepo.update(id, { status: status });
    return { message: 'Status updated successfully', id, status };
  }

  async create(dto: CreateLostDto, user: User, file: Express.Multer.File) {
    const item = this.lostRepo.create({
      ...dto,
      createdBy: user,
      imageUrl: file ? file.filename : undefined, 
    });
    return this.lostRepo.save(item);
  }

  async findByUserId(userId: number) {
    return this.lostRepo.find({
      where: { createdBy: { id: userId } },
      relations: ['createdBy'],
      order: { createdAt: 'DESC' }
    });
  }

  async findAll(page = 1, limit = 10, keyword?: string, location?: string) {
    const qb = this.lostRepo.createQueryBuilder('lost');
    qb.leftJoinAndSelect('lost.createdBy', 'user'); 

    if (keyword) {
      qb.andWhere('(lost.title ILIKE :keyword OR lost.description ILIKE :keyword)', { keyword: `%${keyword}%` });
    }

    if (location) {
      qb.andWhere('lost.location ILIKE :location', { location: `%${location}%` });
    }

    qb.skip((page - 1) * limit).take(limit).orderBy('lost.createdAt', 'DESC');
    const [items, total] = await qb.getManyAndCount();

    return { data: items, total, page, lastPage: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const item = await this.lostRepo.findOne({
      where: { id },
      relations: ['createdBy'], 
    });
    if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
    return item;
  }
}