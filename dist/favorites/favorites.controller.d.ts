import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private favoritesService;
    constructor(favoritesService: FavoritesService);
    addFavoritesController(req: any, body: any): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            created_at: Date;
            title: string;
        };
    }>;
    getFavoritesController(req: any): Promise<{
        success: boolean;
        data: {
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
        };
    }>;
    deleteFavoritesController(req: any, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
