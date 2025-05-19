import { Payment_method, Prisma } from '@prisma/client';
export declare class CreatePlanDto {
    name: string;
    price: any;
    duration_days: number;
    features: string;
}
export declare class UpdatePlanDto {
    name: string;
    price: any;
    duration_days: number;
    features: string;
}
export declare class PurchaseDto {
    plan_id: string;
    payment_method: Payment_method;
    auto_renew: Boolean;
    payment_details: Prisma.InputJsonValue;
}
