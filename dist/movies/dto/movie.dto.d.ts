import { MovieQuality, Subscription_types } from '@prisma/client';
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
export declare enum SubscriptionType {
    FREE = "free",
    PREMIUM = "premium"
}
export declare class FilterMoviesDto {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    subscription_type?: SubscriptionType;
}
export declare class CreateMovieFileDto {
    quality: MovieQuality;
    language: string;
}
