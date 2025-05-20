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
    getBySlug(slug: string): void;
}
