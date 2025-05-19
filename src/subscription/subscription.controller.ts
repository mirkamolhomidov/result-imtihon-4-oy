import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { PurchaseDto } from './dto/subscription.dto';
import { SubscriptionService } from './subscription.service';

@UseGuards(JwtAuthGuard)
@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}
  @Get('plans')
  async getSubscriptionPlansController() {
    const data = await this.subscriptionService.getSubscriptionPlans();
    return { success: true, data };
  }
  @Post('purchase')
  async purchaseController(@Req() req: any, @Body() purchaseDto: PurchaseDto) {
    const data = await this.subscriptionService.purchase(
      req.user.user_id,
      purchaseDto,
    );
    return {
      success: true,
      message: 'Subscription purchased successfully',
      data,
    };
  }
}
