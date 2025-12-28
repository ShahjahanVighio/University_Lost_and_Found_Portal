import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum ClaimStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('claims')
export class Claim {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column()
  itemId: number;

  @Column()
  itemType: 'lost' | 'found';

  @Column({
    type: 'enum',
    enum: ClaimStatus,
    default: ClaimStatus.PENDING,
  })
  status: ClaimStatus;

  @Column()
  otp: string;

  @CreateDateColumn()
  createdAt: Date;
}
