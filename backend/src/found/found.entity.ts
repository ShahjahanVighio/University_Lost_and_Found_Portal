// src/found/found.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class FoundItem {
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
  @Column({ default: 'found' })
  status: string; // 'found' or 'resolved'

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.foundItems)
  createdBy: User;
}