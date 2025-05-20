import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { v4 as uuid } from 'uuid';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/movies')
export class MovieAdminController {
  constructor(private movieService: MovieService) {}
  @Get()
  async getMovies() {
    const data = await this.movieService.getMovies();
    return { success: true, data };
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          const uniqueName = uuid() + '.' + ext;
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
