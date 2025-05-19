import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerController(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            username: string;
            email: string;
            id: string;
            password_hash: string;
            role: import(".prisma/client").$Enums.Roles;
        };
    }>;
    loginController(loginDto: LoginDto, res: Response): Promise<{
        success: boolean;
        message: string;
        data: {
            username: string;
            email: string;
            id: string;
            password_hash: string;
            role: import(".prisma/client").$Enums.Roles;
        };
    }>;
    logout(res: Response): Promise<{
        success: boolean;
        message: string;
    }>;
}
