import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim, ClaimStatus } from './claim.entity';
import { CreateClaimDto } from './dto/create-claim.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private claimRepo: Repository<Claim>,
  ) {}

  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  create(dto: CreateClaimDto, user: User) {
    const otp = this.generateOtp();

    const claim = this.claimRepo.create({
      user,
      itemId: dto.itemId,
      itemType: dto.itemType,
      otp,
    });

    // Email/SMS can be added later
    console.log('OTP:', otp);

    return this.claimRepo.save(claim);
  }

  findAll() {
    return this.claimRepo.find();
  }

  updateStatus(id: number, status: ClaimStatus) {
    return this.claimRepo.update(id, { status });
  }
}
