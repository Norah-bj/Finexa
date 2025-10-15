import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // <- this sets the base path "/auth"
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // <- this is the "/auth/login" endpoint
  async login(@Body() dto : LoginDto) { // <- this is the request body
    return this.authService.login(dto.email, dto.password);
  }
}
