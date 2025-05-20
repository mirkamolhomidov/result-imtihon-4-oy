import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async registerController(@Body() registerDto: RegisterDto) {
    console.log(registerDto);

    const data = await this.authService.register(registerDto);
    return {
      success: true,
      message: "Ro'yxatdan muvaffaqiyatli o'tdingiz",
      data,
    };
  }
  @Post('login')
  async loginController(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, plan, ...data } =
      await this.authService.login(loginDto);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 120 * 60,
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 240 * 60,
    });
    return {
      success: true,
      message: 'Login successfull',
      data,
      plan,
    };
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      res.clearCookie('access_token', {
        httpOnly: true,
        sameSite: 'lax',
      });
      res.clearCookie('refresh_token', {
        httpOnly: true,
        sameSite: 'lax',
      });
      res.status(200);
      return {
        success: true,
        message: 'Muvaffaqiyatli tizimdan chiqildi',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
}
