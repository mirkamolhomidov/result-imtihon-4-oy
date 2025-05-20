import { PrismaService } from 'src/prisma/prisma.service';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    addfavorites(user_id: string, movie_id: string): Promise<{
        id: string;
        created_at: Date;
        title: string;
    }>;
    getFavorites(user_id: string): Promise<{
        movies: {
            id: string;
            slug: string;
            title: string;
            release_year: number;
            poster_url: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            subscription_type: import(".prisma/client").$Enums.Subscription_types;
        }[];
        total: number;
    }>;
    deleteFavorites(user_id: string, movie_id: string): Promise<{
        success: boolean;
    }>;
}
