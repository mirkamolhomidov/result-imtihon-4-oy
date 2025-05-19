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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfileService = class ProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(id) {
        try {
            const user = await this.prisma.profiles.findUnique({
                where: { user_id: id },
            });
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
    async createProfile(user_id, { full_name, phone, country }) {
        try {
            const profile = await this.prisma.profiles.create({
                data: { full_name, phone, country, user: { connect: { id: user_id } } },
            });
            return profile;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
    async updateProfile(user_id, { full_name, phone, country }) {
        try {
            const checkUser = await this.prisma.profiles.findFirst({
                where: { user_id },
            });
            if (!checkUser)
                throw new common_1.NotFoundException('Profil topilmadi');
            const user = await this.prisma.profiles.update({
                where: { user_id },
                data: { full_name, phone, country, user: { connect: { id: user_id } } },
            });
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map