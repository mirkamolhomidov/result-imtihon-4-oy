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
        plan: {
            id: string;
            name: string;
            duration_days: number;
        };
        access_token: string;
        refresh_token: string;
        username: string;
        email: string;
        id: string;
        password_hash: string;
        role: import(".prisma/client").$Enums.Roles;
    }>;
}
