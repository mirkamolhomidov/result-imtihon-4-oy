import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { FavoritesService } from './favorites.service';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}
  @Post()
  async addFavoritesController(@Req() req: any, @Body() body: any) {
    const data = await this.favoritesService.addfavorites(
      req.user.user_id,
      body.movie_id,
    );
    return {
      success: true,
      message: "Kino sevimlilar ro'yxatiga qo'shildi",
      data,
    };
  }
  @Get()
  async getFavoritesController(@Req() req: any) {
    const data = await this.favoritesService.getFavorites(req.user.user_id);
    return { success: true, data };
  }
  @Delete('/:id')
  async deleteFavoritesController(@Req() req: any, @Param('id') id: string) {
    await this.favoritesService.deleteFavorites(req.user.user_id, id);
    return { success: true, message: "Kino sevimlilardan o'chirildi" };
  }
}
