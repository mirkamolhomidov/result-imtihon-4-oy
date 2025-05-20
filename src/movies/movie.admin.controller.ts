import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/roles.decorator';
import { v4 as uuid } from 'uuid';
import {
  CreateMovieDto,
  CreateMovieFileDto,
  UpdateMovieDto,
} from './dto/movie.dto';
import { MovieService } from './movie.service';

@UseGuards(JwtAuthGuard, RoleGuard('admin'))
@Controller('admin/movies')
export class MovieAdminController {
  constructor(private movieService: MovieService) {}
  @Get()
  async getMovies() {
    const data = await this.movieService.getMoviesAdmin();
    return { success: true, data };
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const uniqueName = uuid() + ext;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createMovieController(
    @Req() req: any,
    @UploadedFile() poster: Express.Multer.File,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    return await this.movieService.createMovie(
      createMovieDto,
      req.user.user_id,
      poster.filename,
      createMovieDto.category_ids,
    );
  }

  @Post(':movie_id/files')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/movies',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const name = uuid() + ext;
          cb(null, name);
        },
      }),
    }),
  )
  async uploadMovieFile(
    @Param('movie_id', new ParseUUIDPipe()) movie_id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateMovieFileDto,
  ) {
    return this.movieService.addMovieFile(movie_id, file.filename, body);
  }
  @Put('/:id')
  async updateMovieController(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.movieService.updateMovie(updateMovieDto, id);
  }
  @Delete('/:id')
  async deleteMovie(@Param('id') id: string) {
    await this.movieService.deleteMovie(id);
    return { success: true, message: "Movie muvaffaqiyatli o'chirildi" };
  }
}
