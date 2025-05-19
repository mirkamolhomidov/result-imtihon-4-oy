"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubscriptionService = class SubscriptionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSubscriptionPlans() {
        try {
            const plans = await this.prisma.subscriptionPlan.findMany();
            return plans;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
    async purchase(user_id, { plan_id, payment_method, auto_renew, payment_details }) {
        const checkUserPlan = await this.prisma.userSubscriptions.findFirst({
            where: { user_id, plan_id, status: 'active' },
        });
        if (checkUserPlan)
            throw new common_1.BadRequestException('SubscriptionPlan sotib olingan');
        const planInfo = await this.prisma.subscriptionPlan.findUnique({
            where: { id: plan_id },
        });
        if (!planInfo)
            throw new common_1.BadRequestException('Plan topilmadi');
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
    async createSubscriptionPlan(createPlanDto) {
        try {
            const plan = await this.prisma.subscriptionPlan.create({
                data: createPlanDto,
            });
            return { ...plan };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
    async updateSubscriptionPlan(id, updatePlanDto) {
        try {
            const plan = await this.prisma.subscriptionPlan.update({
                where: { id },
                data: updatePlanDto,
            });
            return { ...plan };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
    async deleteSubscriptionPlan(id) {
        try {
            const checkPlan = await this.prisma.subscriptionPlan.findFirst({
                where: { id },
            });
            if (!checkPlan)
                throw new common_1.BadRequestException('Bunday subcription plan mavjud emas');
            await this.prisma.userSubscriptions.updateMany({
                where: { plan_id: id },
                data: { plan_id: undefined },
            });
            await this.prisma.subscriptionPlan.delete({ where: { id } });
            return { success: true };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map