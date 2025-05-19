import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePlanDto,
  PurchaseDto,
  UpdatePlanDto,
} from './dto/subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}
  async getSubscriptionPlans() {
    try {
      const plans = await this.prisma.subscriptionPlan.findMany();
      return plans;
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async purchase(
    user_id: string,
    { plan_id, payment_method, auto_renew, payment_details }: PurchaseDto,
  ) {
    const checkUserPlan = await this.prisma.userSubscriptions.findFirst({
      where: { user_id, plan_id, status: 'active' },
    });
    if (checkUserPlan)
      throw new BadRequestException('SubscriptionPlan sotib olingan');

    const planInfo = await this.prisma.subscriptionPlan.findUnique({
      where: { id: plan_id },
    });
    if (!planInfo) throw new BadRequestException('Plan topilmadi');

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + planInfo.duration_days);

    const subscription = await this.prisma.userSubscriptions.create({
      data: {
        user_id,
        plan_id,
        start_date: new Date(),
        end_date: endDate,
        status: 'active',
        auto_renew: auto_renew === true,
      },
      select: {
        id: true,
        start_date: true,
        end_date: true,
        status: true,
        auto_renew: true,
        plan: { select: { id: true, name: true } },
      },
    });

    const payment = await this.prisma.payments.create({
      data: {
        user_subscription_id: subscription.id,
        amount: planInfo.price,
        payment_method,
        payment_details,
        status: 'completed',
        external_transaction_id: '',
      },
    });
    return { subscription, payment };
  }

  async createSubscriptionPlan(createPlanDto: CreatePlanDto) {
    try {
      const plan = await this.prisma.subscriptionPlan.create({
        data: createPlanDto,
      });
      return { ...plan };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async updateSubscriptionPlan(id: string, updatePlanDto: UpdatePlanDto) {
    try {
      const plan = await this.prisma.subscriptionPlan.update({
        where: { id },
        data: updatePlanDto,
      });
      return { ...plan };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async deleteSubscriptionPlan(id: string) {
    try {
      const checkPlan = await this.prisma.subscriptionPlan.findFirst({
        where: { id },
      });
      if (!checkPlan)
        throw new BadRequestException('Bunday subcription plan mavjud emas');
      await this.prisma.userSubscriptions.updateMany({
        where: { plan_id: id },
        data: { plan_id: undefined },
      });
      await this.prisma.subscriptionPlan.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
}
