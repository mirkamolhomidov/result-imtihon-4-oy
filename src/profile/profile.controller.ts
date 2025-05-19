import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { CreateDto, UpdateDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Get()
  async getProfileController(@Req() req: any) {
    const data = await this.profileService.getProfile(req.user.user_id);
    return { success: true, data };
  }
  @Post()
  async createProfileController(@Req() req: any, @Body() createDto: CreateDto) {
    console.log(req.user);
    const data = await this.profileService.createProfile(
      req.user.user_id,
      createDto,
    );
    return { success: true, message: 'Profil muvaffaqiyatli yaratildi', data };
  }
  @Put()
  async updateProfileController(@Req() req: any, @Body() updateDto: UpdateDto) {
    const data = await this.profileService.updateProfile(
      req.user.user_id,
      updateDto,
    );
    return { success: true, message: 'Profil muvaffaqiyatli yangilandi', data };
  }
}
