import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/roles.decorator';
import { CreatePlanDto, UpdatePlanDto } from './dto/subscription.dto';
import { SubscriptionService } from './subscription.service';

@UseGuards(JwtAuthGuard, RoleGuard('admin'))
@Controller('admin/subscription/plans')
export class AdminSubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}
  @Post()
  async createSubscriptionController(@Body() createPlanDto: CreatePlanDto) {
    const data =
      await this.subscriptionService.createSubscriptionPlan(createPlanDto);
    return {
      success: true,
      message: "Subscription muvaffaqiyatli qo'shildi",
      data,
    };
  }
  @Put('/:id')
  async updateSubscriptionController(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    const data = await this.subscriptionService.updateSubscriptionPlan(
      id,
      updatePlanDto,
    );
    return {
      success: true,
      message: 'SubscriptionPlan muvaffaqiyatli yangilandi',
      data,
    };
  }
  @Delete('/:id')
  async deleteSubscriptionController(@Param('id') id: string) {
    await this.subscriptionService.deleteSubscriptionPlan(id);
    return {
      success: true,
      message: "SubscriptionPlan muvaffaqiyatli o'chirildi",
    };
  }
}
