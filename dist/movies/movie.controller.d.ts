import { FilterMoviesDto } from './dto/movie.dto';
import { MovieService } from './movie.service';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getAll(queries: FilterMoviesDto): Promise<{
        success: boolean;
        data: {
            movies: {
                id: string;
                title: string;
                slug: string;
                poster_url: string;
                release_year: number;
                rating: import("@prisma/client/runtime/library").Decimal;
                subscription_type: string;
                categories: string[];
            }[];
            pagination: {
                total: number;
                page1: number;
                limit1: number;
                pages: number;
            };
        };
    }>;
    getBySlug(slug: string): Promise<{
        success: boolean;
        data: {
            id: string;
            title: string;
            slug: string;
            description: string;
            release_year: number;
            duration_minutes: number;
            poster_url: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            subscription_type: string;
            view_count: number;
            is_favorite: boolean;
            categories: string[];
            files: {
                quality: import(".prisma/client").$Enums.MovieQuality;
                language: string;
            }[];
            reviews: {
                average_rating: number;
                count: number;
            };
        };
    }>;
}
