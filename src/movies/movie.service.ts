import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateMovieDto,
  CreateMovieFileDto,
  FilterMoviesDto,
  UpdateMovieDto,
} from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}
  async getAll({
    category,
    limit,
    page,
    search,
    subscription_type,
  }: FilterMoviesDto) {
    const page1 = parseInt(page || '1');
    const limit1 = parseInt(limit || '20');
    const skip = (page1 - 1) * limit1;

    const where: any = {};

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    if (subscription_type) {
      where.subscriptionType = subscription_type.toUpperCase();
    }

    if (category) {
      where.categories = {
        some: {
          category: {
            name: { contains: category, mode: 'insensitive' },
          },
        },
      };
    }

    const [movies, total] = await Promise.all([
      this.prisma.movies.findMany({
        where,
        skip,
        take: limit1,
        include: {
          Movie_categories: {
            include: { category: true },
          },
        },
      }),
      this.prisma.movies.count({ where }),
    ]);

    return {
      success: true,
      data: {
        movies: movies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          slug: movie.slug,
          poster_url: movie.poster_url,
          release_year: movie.release_year,
          rating: movie.rating,
          subscription_type: movie.subscription_type.toLowerCase(),
          categories: movie.Movie_categories.map((c) => c.category.name),
        })),
        pagination: {
          total,
          page1,
          limit1,
          pages: Math.ceil(total / limit1),
        },
      },
    };
  }
  async getOneMovie(slug: string) {
    const movie = await this.prisma.movies.findUnique({
      where: { slug },
      include: {
        Movie_files: true,
        Movie_categories: { include: { category: true } },
        Reviews: true,
      },
    });

    if (!movie) throw new NotFoundException('Kino topilmadi');

    const avgRating =
      movie.Reviews.reduce((acc, r) => acc + r.rating, 0) /
      (movie.Reviews.length || 1);

    return {
      success: true,
      data: {
        id: movie.id,
        title: movie.title,
        slug: movie.slug,
        description: movie.description,
        release_year: movie.release_year,
        duration_minutes: movie.duration_minutes,
        poster_url: movie.poster_url,
        rating: movie.rating,
        subscription_type: movie.subscription_type.toLowerCase(),
        view_count: movie.view_count,
        is_favorite: false,
        categories: movie.Movie_categories.map((c) => c.category.name),
        files: movie.Movie_files.map((f) => ({
          quality: f.quality,
          language: f.language,
        })),
        reviews: {
          average_rating: Number(avgRating.toFixed(1)),
          count: movie.Reviews.length,
        },
      },
    };
  }

  async getMoviesAdmin() {
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
  async addMovieFile(
    movieId: string,
    fileName: string,
    dto: CreateMovieFileDto,
  ) {
    try {
      const movie = await this.prisma.movies.findUnique({
        where: { id: movieId },
      });
      if (!movie) throw new NotFoundException('Kino topilmadi');

      const createdFile = await this.prisma.movie_files.create({
        data: {
          movie_id: movieId,
          file_url: fileName,
          quality: dto.quality,
          language: dto.language,
        },
      });

      return { success: true, data: createdFile };
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
