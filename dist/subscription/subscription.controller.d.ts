import { PurchaseDto } from './dto/subscription.dto';
import { SubscriptionService } from './subscription.service';
export declare class SubscriptionController {
    private subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    getSubscriptionPlansController(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            duration_days: number;
            features: import("@prisma/client/runtime/library").JsonValue;
            is_active: boolean;
        }[];
    }>;
    purchaseController(req: any, purchaseDto: PurchaseDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
                payment_method: import(".prisma/client").$Enums.Payment_method;
                payment_details: import("@prisma/client/runtime/library").JsonValue;
                user_subscription_id: string;
                amount: import("@prisma/client/runtime/library").Decimal;
                external_transaction_id: string;
            };
        };
    }>;
}
