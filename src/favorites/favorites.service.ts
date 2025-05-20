import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async addfavorites(user_id: string, movie_id: string) {
    try {
      const favorite = await this.prisma.favorites.create({
        data: { user_id, movie_id },
        include: {
          movie: {
            select: {
              id: true,
              title: true,
              created_at: true,
            },
          },
        },
      });
      const { movie } = favorite;
      return movie;
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async getFavorites(user_id: string) {
    try {
      const favorites = await this.prisma.favorites.findMany({
        where: { user_id },
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
      const movies = favorites.map((fav) => fav.movie);
      const total = movies.length;
      return { movies, total };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async deleteFavorites(user_id: string, movie_id: string) {
    try {
      await this.prisma.favorites.deleteMany({
        where: {
          user_id,
          movie_id,
        },
      });

      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
}
