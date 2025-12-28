import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany, // <--- Ye import add karein
} from 'typeorm';
import { LostItem } from '../lost/lost.entity'; // Path check kar lein
import { FoundItem } from '../found/found.entity'; 

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  // ✅ Ek user ke bohat se Lost Items ho sakte hain
  @OneToMany(() => LostItem, (lostItem) => lostItem.createdBy)
  lostItems: LostItem[];

  // ✅ Ek user ke bohat se Found Items ho sakte hain
  @OneToMany(() => FoundItem, (foundItem) => foundItem.createdBy)
  foundItems: FoundItem[];

  @CreateDateColumn()
  createdAt: Date;
}