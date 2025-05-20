import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto/profile.dto';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(id: string): Promise<{
        id: string;
        user_id: string;
        created_at: Date;
        full_name: string;
        phone: string;
        country: string;
    } | null>;
    createProfile(user_id: string, { full_name, phone, country }: CreateDto): Promise<{
        id: string;
        user_id: string;
        created_at: Date;
        full_name: string;
        phone: string;
        country: string;
    }>;
    updateProfile(user_id: string, { full_name, phone, country }: UpdateDto): Promise<{
        id: string;
        user_id: string;
        created_at: Date;
        full_name: string;
        phone: string;
        country: string;
    }>;
}
