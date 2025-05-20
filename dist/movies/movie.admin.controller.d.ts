import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';
export declare class MovieAdminController {
    private movieService;
    constructor(movieService: MovieService);
    getMovies(): Promise<{
        success: boolean;
        data: {
            movies: {
                id: string;
                title: string;
                slug: string;
                description: string;
                release_year: number;
                duration_minutes: number;
                poster_url: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                subscription_type: import(".prisma/client").$Enums.Subscription_types;
                view_count: number;
                created_by: string;
                created_at: Date;
            }[];
            total: number;
        };
    }>;
    createMovieController(req: any, poster: Express.Multer.File, createMovieDto: CreateMovieDto): Promise<{
        success: boolean;
        data: {
            Movie_categories: {
                id: string;
                category_id: string;
                movie_id: string;
            }[];
        } & {
            id: string;
            title: string;
            slug: string;
            description: string;
            release_year: number;
            duration_minutes: number;
            poster_url: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            subscription_type: import(".prisma/client").$Enums.Subscription_types;
            view_count: number;
            created_by: string;
            created_at: Date;
        };
    }>;
    updateMovieController(id: string, updateMovieDto: UpdateMovieDto): Promise<{
        success: boolean;
        data: {
            Movie_categories: {
                id: string;
                category_id: string;
                movie_id: string;
            }[];
        } & {
            id: string;
            title: string;
            slug: string;
            description: string;
            release_year: number;
            duration_minutes: number;
            poster_url: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            subscription_type: import(".prisma/client").$Enums.Subscription_types;
            view_count: number;
            created_by: string;
            created_at: Date;
        };
    }>;
    deleteMovie(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
