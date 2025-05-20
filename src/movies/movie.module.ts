import { Module } from '@nestjs/common';
import { MovieAdminController } from './movie.admin.controller';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  controllers: [MovieAdminController, MovieController],
  providers: [MovieService],
})
export class MovieModel {}
