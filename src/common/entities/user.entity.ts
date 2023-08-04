import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import UserInterface from 'src/common/interface/user.interface';

@Entity('users')
export class User implements UserInterface {
  // Default ID of the transaction
  @PrimaryGeneratedColumn()
  id: number;

  // First name of the user
  @Column({ nullable: false, length: 35 })
  first_name: string;

  // Last name of the user
  @Column({ nullable: false, length: 35 })
  last_name: string;

  // Email ID of the user
  @Column({ nullable: false, length: 50, unique: true })
  email: string;

  // User's Phone Number
  @Column({ nullable: true, length: 20, unique: true })
  phone: string;

  // User's Password
  @Column({ nullable: false, length: 18 })
  password: string;

  // Account Active status
  @Column({ nullable: false, default: false })
  is_active: boolean;

  // Default Record Created Datetime
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })

  // Record Created DateTime
  created_at: Date;

  // Record Updated DateTime
  @UpdateDateColumn({ nullable: false })
  updated_at: Date;

  // Record Deleted DateTime
  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
