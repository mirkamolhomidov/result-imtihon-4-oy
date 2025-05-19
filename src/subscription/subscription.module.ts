import { Module } from '@nestjs/common';
import { AdminSubscriptionController } from './subscription.admin.controller';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  providers: [SubscriptionService],
  controllers: [SubscriptionController, AdminSubscriptionController],
})
export class SubscriptionModule {}
