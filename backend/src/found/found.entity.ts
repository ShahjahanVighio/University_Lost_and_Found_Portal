import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('found_items')
export class FoundItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  // 1. Iska naam 'imageUrl' hona chahiye (Service se match karne ke liye)
  @Column({ nullable: true })
  imageUrl: string; 

  // 2. Iska naam 'createdBy' hona chahiye
  @ManyToOne(() => User, (user) => user.foundItems)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;
}