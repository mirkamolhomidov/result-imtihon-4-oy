import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { ReviewService } from './review.service';

@UseGuards(JwtAuthGuard)
@Controller('movies/:movie_id/reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  @Post()
  async addReviewController(
    @Req() req: any,
    @Param('movie_id') movie_id: string,
    @Body() body: any,
  ) {
    const data = await this.reviewService.addReview(
      req.user.user_id,
      movie_id,
      body,
    );
    return { success: true, message: "Sharh muvaffaqiyatli qo'shildi", data };
  }
  @Delete('/:review_id')
  async deleteReviewController(
    @Req() req: any,
    @Param('movie_id') movie_id: string,
    @Param('review_id') review_id: string,
  ) {
    await this.reviewService.deleteReview(
      req.user.user_id,
      movie_id,
      review_id,
    );
    return { success: true, message: "Sharh muvaffaqiyatli o'chirildi" };
  }
}
