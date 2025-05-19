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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async registerController(registerDto) {
        console.log(registerDto);
        const data = await this.authService.register(registerDto);
        return {
            success: true,
            message: "Ro'yxatdan muvaffaqiyatli o'tdingiz",
            data,
        };
    }
    async loginController(loginDto, res) {
        const { access_token, refresh_token, UserSubscriptions, ...data } = await this.authService.login(loginDto);
        res.cookie('access_token', access_token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 120 * 60,
        });
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 240 * 60,
        });
        return { success: true, message: 'Login successfull', data };
    }
    async logout(res) {
        try {
            res.clearCookie('access_token', {
                httpOnly: true,
                sameSite: 'lax',
            });
            res.clearCookie('refresh_token', {
                httpOnly: true,
                sameSite: 'lax',
            });
            res.status(200);
            return {
                success: true,
                message: 'Muvaffaqiyatli tizimdan chiqildi',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerController", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginController", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map