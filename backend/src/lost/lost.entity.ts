// src/lost/lost.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class LostItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  imageUrl: string;

  // YE LINE ADD KAREIN
  @Column({ default: 'lost' }) 
  status: string; // 'lost' or 'resolved'

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.lostItems)
  createdBy: User;
}