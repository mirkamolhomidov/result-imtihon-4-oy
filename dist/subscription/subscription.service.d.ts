import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDto, PurchaseDto, UpdatePlanDto } from './dto/subscription.dto';
export declare class SubscriptionService {
    private prisma;
    constructor(prisma: PrismaService);
    getSubscriptionPlans(): Promise<{
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        duration_days: number;
        features: import("@prisma/client/runtime/library").JsonValue;
        is_active: boolean;
    }[]>;
    purchase(user_id: string, { plan_id, payment_method, auto_renew, payment_details }: PurchaseDto): Promise<{
        subscription: {
            id: string;
            start_date: Date;
            end_date: Date;
            status: import(".prisma/client").$Enums.UserSubStatus;
            auto_renew: boolean;
            plan: {
                id: string;
                name: string;
            };
        };
        payment: {
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
            created_at: Date;
            user_subscription_id: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            payment_method: import(".prisma/client").$Enums.Payment_method;
            payment_details: import("@prisma/client/runtime/library").JsonValue;
            external_transaction_id: string;
        };
    }>;
    createSubscriptionPlan(createPlanDto: CreatePlanDto): Promise<{
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        duration_days: number;
        features: import("@prisma/client/runtime/library").JsonValue;
        is_active: boolean;
    }>;
    updateSubscriptionPlan(id: string, updatePlanDto: UpdatePlanDto): Promise<{
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        duration_days: number;
        features: import("@prisma/client/runtime/library").JsonValue;
        is_active: boolean;
    }>;
    deleteSubscriptionPlan(id: string): Promise<{
        success: boolean;
    }>;
}
