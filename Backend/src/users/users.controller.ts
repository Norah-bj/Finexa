import { Controller, Post, Body, Get, Param, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<{ id: string; fullName: string; age: number; email: string }> {
    return this.usersService.createUser(dto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id/profile')
  async getProfile(@Param('id') id: string) {
    return this.usersService.getUserProfile(id);
  }

  @Get(':id/financial-summary')
  async getFinancialSummary(@Param('id') id: string) {
    return this.usersService.getFinancialSummary(id);
  }

  @Patch(':id/profile')
  @UseInterceptors(FileInterceptor('profilePicture', multerConfig))
  async updateProfile(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.usersService.updateUserProfile(id, dto, file);
  }
}
