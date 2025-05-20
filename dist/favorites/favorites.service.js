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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FavoritesService = class FavoritesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addfavorites(user_id, movie_id) {
        try {
            const favorite = await this.prisma.favorites.create({
                data: { user_id, movie_id },
                include: {
                    movie: {
                        select: {
                            id: true,
                            title: true,
                            created_at: true,
                        },
                    },
                },
            });
            const { movie } = favorite;
            return movie;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
    async getFavorites(user_id) {
        try {
            const favorites = await this.prisma.favorites.findMany({
                where: { user_id },
                include: {
                    movie: {
                        select: {
                            id: true,
                            title: true,
                            slug: true,
                            poster_url: true,
                            release_year: true,
                            rating: true,
                            subscription_type: true,
                        },
                    },
                },
            });
            const movies = favorites.map((fav) => fav.movie);
            const total = movies.length;
            return { movies, total };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
    async deleteFavorites(user_id, movie_id) {
        try {
            await this.prisma.favorites.deleteMany({
                where: {
                    user_id,
                    movie_id,
                },
            });
            return { success: true };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map