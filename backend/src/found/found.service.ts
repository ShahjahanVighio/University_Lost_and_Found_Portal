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

  // 1. Profile Page ke liye zaroori method (Missing tha)
  async findByUserId(userId: number) {
    return this.foundRepo.find({
      where: { createdBy: { id: userId } },
      relations: ['createdBy'],
      order: { createdAt: 'DESC' }
    });
  }

  // 2. Status Update
  async updateStatus(id: number, status: string) {
    const item = await this.findOne(id);
    await this.foundRepo.update(id, { status: status });
    return { 
      message: 'Status updated successfully', 
      itemId: id, 
      newStatus: status 
    };
  }

  // 3. Create a new found item
  async create(dto: CreateFoundDto, user: User, file: Express.Multer.File) {
    const item = this.foundRepo.create({
      ...dto,
      createdBy: user,
      imageUrl: file ? file.filename : undefined,
    });
    return this.foundRepo.save(item);
  }

  // 4. Find all found items
  async findAll() {
    return this.foundRepo.find({
      relations: ['createdBy'],
      order: { createdAt: 'DESC' }
    });
  }

  // 5. Find Single Item by ID
  async findOne(id: number) {
    const item = await this.foundRepo.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    
    if (!item) {
      throw new NotFoundException(`Found item with ID ${id} not found`);
    }
    
    return item;
  }
}