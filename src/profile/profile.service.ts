import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  async getProfile(id: string) {
    try {
      const user = await this.prisma.profiles.findUnique({
        where: { user_id: id },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async createProfile(
    user_id: string,
    { full_name, phone, country }: CreateDto,
  ) {
    try {
      const profile = await this.prisma.profiles.create({
        data: { full_name, phone, country, user: { connect: { id: user_id } } },
      });
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async updateProfile(
    user_id: string,
    { full_name, phone, country }: UpdateDto,
  ) {
    try {
      const checkUser = await this.prisma.profiles.findFirst({
        where: { user_id },
      });
      if (!checkUser) throw new NotFoundException('Profil topilmadi');
      const user = await this.prisma.profiles.update({
        where: { user_id },
        data: { full_name, phone, country, user: { connect: { id: user_id } } },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
}
