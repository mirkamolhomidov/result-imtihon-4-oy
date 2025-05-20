import { CreateMovieDto, CreateMovieFileDto, UpdateMovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';
export declare class MovieAdminController {
    private movieService;
    constructor(movieService: MovieService);
    getMovies(): Promise<{
        success: boolean;
        data: {
            movies: {
                id: string;
                created_at: Date;
                description: string;
                slug: string;
                title: string;
                release_year: number;
                duration_minutes: number;
                poster_url: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                subscription_type: import(".prisma/client").$Enums.Subscription_types;
                view_count: number;
                created_by: string;
            }[];
            total: number;
        };
    }>;
    createMovieController(req: any, poster: Express.Multer.File, createMovieDto: CreateMovieDto): Promise<{
        success: boolean;
        data: {
            Movie_categories: {
                id: string;
                movie_id: string;
                category_id: string;
            }[];
        } & {
            id: string;
            created_at: Date;
            description: string;
            slug: string;
            title: string;
            release_year: number;
            duration_minutes: number;
            poster_url: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            subscription_type: import(".prisma/client").$Enums.Subscription_types;
            view_count: number;
            created_by: string;
        };
    }>;
    uploadMovieFile(movie_id: string, file: Express.Multer.File, body: CreateMovieFileDto): Promise<{
        success: boolean;
        data: {
            id: string;
            movie_id: string;
            quality: import(".prisma/client").$Enums.MovieQuality;
            language: string;
            file_url: string;
        };
    }>;
    updateMovieController(id: string, updateMovieDto: UpdateMovieDto): Promise<{
        success: boolean;
        data: {
            Movie_categories: {
                id: string;
                movie_id: string;
                category_id: string;
            }[];
        } & {
            id: string;
            created_at: Date;
            description: string;
            slug: string;
            title: string;
            release_year: number;
            duration_minutes: number;
            poster_url: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            subscription_type: import(".prisma/client").$Enums.Subscription_types;
            view_count: number;
            created_by: string;
        };
    }>;
    deleteMovie(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
