import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async addfavorites(user_id: string, movie_id: string) {
    const favorite = await this.prisma.favorites.create({
      data: { user_id, movie_id },
      include: {
        movie: {
          select: {
            id: true,
            title: true,
            slug: true,
            poster_url: true,
            release_year: true,
            rating: true,
            subscription_type: true,
          },
        },
      },
    });
    return favorite;
  }
  async getFavorites(user_id: string) {
    const favorites = await this.prisma.favorites.findMany({
      where: { user_id },
    });
    const total = favorites.length;
    return { favorites, total };
  }
  async deleteFavorites(user_id: string, movie_id: string) {
    try {
      await this.prisma.favorites.delete({ where: { user_id, movie_id } });
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
}
