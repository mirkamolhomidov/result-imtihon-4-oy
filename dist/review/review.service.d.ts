import { PrismaService } from 'src/prisma/prisma.service';
export declare class ReviewService {
    private prisma;
    constructor(prisma: PrismaService);
    addReview(user_id: string, movie_id: string, data: any): Promise<{
        user: {
            username: string;
            id: string;
        };
    } & {
        id: string;
        user_id: string;
        created_at: Date;
        movie_id: string;
        rating: number;
        comment: string;
    }>;
    deleteReview(user_id: string, movie_id: string, review_id: string): Promise<{
        success: boolean;
    }>;
}
