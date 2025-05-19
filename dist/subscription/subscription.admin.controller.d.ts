import { CreatePlanDto, UpdatePlanDto } from './dto/subscription.dto';
import { SubscriptionService } from './subscription.service';
export declare class AdminSubscriptionController {
    private subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    createSubscriptionController(createPlanDto: CreatePlanDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            duration_days: number;
            features: import("@prisma/client/runtime/library").JsonValue;
            is_active: boolean;
        };
    }>;
    updateSubscriptionController(id: string, updatePlanDto: UpdatePlanDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            duration_days: number;
            features: import("@prisma/client/runtime/library").JsonValue;
            is_active: boolean;
        };
    }>;
    deleteSubscriptionController(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
