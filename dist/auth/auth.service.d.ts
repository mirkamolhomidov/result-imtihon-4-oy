import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        username: string;
        email: string;
        id: string;
        password_hash: string;
        role: import(".prisma/client").$Enums.Roles;
    }>;
    login(loginDto: LoginDto): Promise<{
        UserSubscriptions: ({
            plan: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                duration_days: number;
                features: import("@prisma/client/runtime/library").JsonValue;
                is_active: boolean;
            };
        } & {
            id: string;
            user_id: string;
            plan_id: string;
            start_date: Date;
            end_date: Date;
            status: import(".prisma/client").$Enums.UserSubStatus;
            auto_renew: boolean;
            created_at: Date;
        })[];
        access_token: string;
        refresh_token: string;
        username: string;
        email: string;
        id: string;
        password_hash: string;
        role: import(".prisma/client").$Enums.Roles;
    }>;
}
