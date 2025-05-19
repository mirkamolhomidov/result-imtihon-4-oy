import { Injectable, InternalServerErrorException } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async createCategory({ name, description }: CreateCategoryDto) {
    try {
      const category = await this.prisma.categories.create({
        data: {
          name,
          slug: slugify(name, { lower: true, strict: true }),
          description,
        },
      });
      return category;
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async deleteCategory(id: string) {
    try {
      await this.prisma.categories.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
}
