import { ReviewService } from './review.service';
export declare class ReviewController {
    private reviewService;
    constructor(reviewService: ReviewService);
    addReviewController(req: any, movie_id: string, body: any): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    deleteReviewController(req: any, movie_id: string, review_id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
