import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Claim, ClaimStatus } from '../claims/claim.entity'; // adjust path if needed
import { LostItem } from '../lost/lost.entity';
import { FoundItem } from '../found/found.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Claim)
    private claimRepo: Repository<Claim>,

    @InjectRepository(LostItem)
    private lostRepo: Repository<LostItem>,

    @InjectRepository(FoundItem)
    private foundRepo: Repository<FoundItem>,
  ) {}

  getAllUsers() {
    return this.userRepo.find();
  }

  getAllClaims() {
    return this.claimRepo.find({ relations: ['user'] });
  }

  async approveClaim(id: number) {
  const claim = await this.claimRepo.findOne({ where: { id } });
  if (!claim) throw new NotFoundException('Claim not found');

  claim.status = ClaimStatus.APPROVED; // <--- use enum
  return this.claimRepo.save(claim);
}

async rejectClaim(id: number) {
  const claim = await this.claimRepo.findOne({ where: { id } });
  if (!claim) throw new NotFoundException('Claim not found');

  claim.status = ClaimStatus.REJECTED; // <--- use enum
  return this.claimRepo.save(claim);
}


  async deleteLostItem(id: number) {
    const result = await this.lostRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Lost item not found');
    return { message: 'Lost item deleted' };
  }

  async deleteFoundItem(id: number) {
    const result = await this.foundRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Found item not found');
    return { message: 'Found item deleted' };
  }
}
