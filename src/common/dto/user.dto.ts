import { IsString, IsNotEmpty, IsEmpty, IsOptional } from 'class-validator';
import UserInterface from 'src/common/interface/user.interface';

/**
 * DTO for New User
 */
export class UserDTO implements UserInterface {
  id: number;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  is_active: boolean;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date;
}

/**
 * DTO for User Update
 */
export class UpdateUserDTO implements UserInterface {
  id: number;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsEmpty()
  is_active: boolean;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date;
}
