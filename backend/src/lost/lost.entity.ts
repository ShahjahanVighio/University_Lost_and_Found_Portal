import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
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

  @Column({ nullable: true }) // <--- Yeh lazmi check karein
  imageUrl: string; 

  @ManyToOne(() => User, (user) => user.lostItems)
  createdBy: User; // <--- Yeh 'createdBy' hona chahiye

  @CreateDateColumn()
  createdAt: Date;
}