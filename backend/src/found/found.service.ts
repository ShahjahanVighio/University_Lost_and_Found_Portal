import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoundItem } from './found.entity';
import { CreateFoundDto } from './dto/create-found.dto';
import { User } from '../users/user.entity';

@Injectable()
export class FoundService {
  constructor(
    @InjectRepository(FoundItem)
    private foundRepo: Repository<FoundItem>,
  ) {}

  async create(dto: CreateFoundDto, user: User, file: Express.Multer.File) {
    const item = this.foundRepo.create({
      ...dto,
      createdBy: user,
      imageUrl: file ? file.filename : undefined,
    });
    return this.foundRepo.save(item);
  }

  async findAll() {
    // Pagination aur search aap baad mein add kar sakte hain jaise Lost mein kiya
    return this.foundRepo.find({
      relations: ['createdBy'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number) {
    const item = await this.foundRepo.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!item) throw new NotFoundException('Found item not found');
    return item;
  }
}