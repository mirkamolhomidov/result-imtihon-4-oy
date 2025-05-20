import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  async addReview(user_id: string, movie_id: string, data: any) {
    try {
      const review = await this.prisma.reviews.create({
        data: { user_id, movie_id, ...data },
        include: { user: { select: { id: true, username: true } } },
      });
      return review;
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async deleteReview(user_id: string, movie_id: string, review_id: string) {
    try {
      await this.prisma.reviews.delete({
        where: { id: review_id, movie_id, user_id },
      });
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
}
