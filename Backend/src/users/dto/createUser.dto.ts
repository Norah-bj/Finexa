import { IsEmail, IsNotEmpty, MinLength, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsInt()
  @Min(13, { message: 'Age must be at least 13' })
  age: number;

  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
