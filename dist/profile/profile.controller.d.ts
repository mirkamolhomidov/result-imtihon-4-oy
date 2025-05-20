import { CreateDto, UpdateDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getProfileController(req: any): Promise<{
        success: boolean;
        data: {
            id: string;
            user_id: string;
            created_at: Date;
            full_name: string;
            phone: string;
            country: string;
        } | null;
    }>;
    createProfileController(req: any, createDto: CreateDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            user_id: string;
            created_at: Date;
            full_name: string;
            phone: string;
            country: string;
        };
    }>;
    updateProfileController(req: any, updateDto: UpdateDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            user_id: string;
            created_at: Date;
            full_name: string;
            phone: string;
            country: string;
        };
    }>;
}
