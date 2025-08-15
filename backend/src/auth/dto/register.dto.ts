import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/roles.enum.js';

export class RegisterDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(6) password!: string;
  @IsIn([Role.Admin, Role.User]) role!: Role;
}
