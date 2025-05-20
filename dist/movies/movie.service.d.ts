import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
export declare class MovieService {
    private prisma;
    constructor(prisma: PrismaService);
    getMovies(): Promise<{
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
    }>;
    generateShortUuid(title: string): Promise<string>;
    createMovie(createMovieDto: CreateMovieDto, user_id: string, fileName: string, categoryIds: string[]): Promise<{
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
    updateMovie(updateMovieDto: UpdateMovieDto, id: string): Promise<{
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
    deleteMovie(id: string): Promise<void>;
}
