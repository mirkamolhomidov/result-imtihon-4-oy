import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilterMoviesDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  async getAll(@Query() queries: FilterMoviesDto) {
    return await this.movieService.getAll(queries);
  }
  @Get('/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.movieService.getOneMovie(slug);
  }
}
