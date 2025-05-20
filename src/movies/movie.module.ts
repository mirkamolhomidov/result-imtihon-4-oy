import { Module } from '@nestjs/common';
import { MovieAdminController } from './movie.admin.controller';
import { MovieService } from './movie.service';

@Module({
  controllers: [MovieAdminController],
  providers: [MovieService],
})
export class MovieModel {}
