import { Injectable, InternalServerErrorException } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}
  async getMovies() {
    const movies = await this.prisma.movies.findMany();
    const total = movies.length;
    return { movies, total };
  }
  async generateShortUuid(title: string) {
    const slug = slugify(title, { lower: true, strict: true });
    const id = uuidv4().split('-').slice(0, 4).join('-');
    return `${slug}-${id}`;
  }
  async createMovie(
    createMovieDto: CreateMovieDto,
    user_id: string,
    fileName: string,
    categoryIds: string[],
  ) {
    try {
      const parsedIds = Array.isArray(categoryIds)
        ? categoryIds
        : JSON.parse(categoryIds);
      const movie = await this.prisma.movies.create({
        data: {
          title: createMovieDto.title,
          description: createMovieDto.description,
          rating: +createMovieDto.rating,
          release_year: +createMovieDto.release_year,
          duration_minutes: +createMovieDto.duration_minutes,
          subscription_type: createMovieDto.subscription_type,
          slug: await this.generateShortUuid(createMovieDto.title),
          poster_url: fileName,
          created_by: user_id,
          Movie_categories: {
            create: parsedIds.map((category_id: string) => ({
              category: { connect: { id: category_id } },
            })),
          },
        },
        include: { Movie_categories: true },
      });
      return { success: true, data: movie };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async updateMovie(updateMovieDto: UpdateMovieDto, id: string) {
    try {
      await this.prisma.movie_categories.deleteMany({
        where: { movie_id: id },
      });
      const movie = await this.prisma.movies.update({
        where: { id },
        data: {
          title: updateMovieDto.title,
          description: updateMovieDto.description,
          subscription_type: updateMovieDto.subscription_type,
          Movie_categories: {
            create: updateMovieDto.category_ids.map((category_id: string) => ({
              category: { connect: { id: category_id } },
            })),
          },
        },
        include: { Movie_categories: true },
      });
      return { success: true, data: movie };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async deleteMovie(id: string) {
    try {
      await this.prisma.movies.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
}
