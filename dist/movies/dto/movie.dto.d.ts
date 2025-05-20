import { Subscription_types } from '@prisma/client';
export declare class CreateMovieDto {
    title: string;
    description: string;
    rating: string;
    release_year: string;
    duration_minutes: string;
    subscription_type: Subscription_types;
    category_ids: string[];
}
export declare class UpdateMovieDto {
    title: string;
    description: string;
    subscription_type: Subscription_types;
    category_ids: string[];
}
