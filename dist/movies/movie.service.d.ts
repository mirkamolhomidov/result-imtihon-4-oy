import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto, CreateMovieFileDto, FilterMoviesDto, UpdateMovieDto } from './dto/movie.dto';
export declare class MovieService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll({ category, limit, page, search, subscription_type, }: FilterMoviesDto): Promise<{
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
    getOneMovie(slug: string): Promise<{
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
    getMoviesAdmin(): Promise<{
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
    }>;
    generateShortUuid(title: string): Promise<string>;
    createMovie(createMovieDto: CreateMovieDto, user_id: string, fileName: string, categoryIds: string[]): Promise<{
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
    addMovieFile(movieId: string, fileName: string, dto: CreateMovieFileDto): Promise<{
        success: boolean;
        data: {
            id: string;
            movie_id: string;
            quality: import(".prisma/client").$Enums.MovieQuality;
            language: string;
            file_url: string;
        };
    }>;
    updateMovie(updateMovieDto: UpdateMovieDto, id: string): Promise<{
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
    deleteMovie(id: string): Promise<void>;
}
