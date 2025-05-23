"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        try {
            const { password, ...body } = registerDto;
            const checkEmail = await this.prisma.users.findFirst({
                where: { email: registerDto.email },
            });
            const checkUsername = await this.prisma.users.findFirst({
                where: { email: registerDto.username },
            });
            if (checkEmail)
                throw new common_1.BadRequestException('Email already exists');
            if (checkUsername)
                throw new common_1.BadRequestException('Username already exists');
            const hashedPass = await bcrypt.hash(password, 12);
            const data = await this.prisma.users.create({
                data: { ...body, password_hash: hashedPass },
            });
            return { ...data };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
    async login(loginDto) {
        try {
            const checkUser = await this.prisma.users.findFirst({
                where: { email: loginDto.email },
                include: {
                    UserSubscriptions: {
                        include: {
                            plan: { select: { id: true, name: true, duration_days: true } },
                        },
                    },
                },
            });
            if (!checkUser)
                throw new common_1.UnauthorizedException('Email or password invalid');
            const checkPass = await bcrypt.compare(loginDto.password, checkUser?.password_hash);
            if (!checkPass)
                throw new common_1.UnauthorizedException('Email or password invalid');
            const payload = {
                id: checkUser.id,
                role: checkUser.role,
            };
            const access_token = await this.jwtService.signAsync(payload, {
                expiresIn: '2h',
            });
            const refresh_token = await this.jwtService.signAsync(payload, {
                expiresIn: '4h',
            });
            const { UserSubscriptions, ...data } = checkUser;
            const [{ plan }] = UserSubscriptions;
            return { ...data, plan, access_token, refresh_token };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map