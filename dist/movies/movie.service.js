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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const slugify_1 = require("slugify");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let MovieService = class MovieService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMovies() {
        const movies = await this.prisma.movies.findMany();
        const total = movies.length;
        return { movies, total };
    }
    async generateShortUuid(title) {
        const slug = (0, slugify_1.default)(title, { lower: true, strict: true });
        const id = (0, uuid_1.v4)().split('-').slice(0, 4).join('-');
        return `${slug}-${id}`;
    }
    async createMovie(createMovieDto, user_id, fileName, categoryIds) {
        try {
            const parsedIds = Array.isArray(categoryIds)
                ? categoryIds
                : JSON.parse(categoryIds);
            const movie = await this.prisma.movies.create({
                data: {
                    title: createMovieDto.title,
                    description: createMovieDto.description,
                    rating: +createMovieDto.rating,
                    release_year: +createMovieDto.release_year,
                    duration_minutes: +createMovieDto.duration_minutes,
                    subscription_type: createMovieDto.subscription_type,
                    slug: await this.generateShortUuid(createMovieDto.title),
                    poster_url: fileName,
                    created_by: user_id,
                    Movie_categories: {
                        create: parsedIds.map((category_id) => ({
                            category: { connect: { id: category_id } },
                        })),
                    },
                },
                include: { Movie_categories: true },
            });
            return { success: true, data: movie };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
    async updateMovie(updateMovieDto, id) {
        try {
            await this.prisma.movie_categories.deleteMany({
                where: { movie_id: id },
            });
            const movie = await this.prisma.movies.update({
                where: { id },
                data: {
                    title: updateMovieDto.title,
                    description: updateMovieDto.description,
                    subscription_type: updateMovieDto.subscription_type,
                    Movie_categories: {
                        create: updateMovieDto.category_ids.map((category_id) => ({
                            category: { connect: { id: category_id } },
                        })),
                    },
                },
                include: { Movie_categories: true },
            });
            return { success: true, data: movie };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
    async deleteMovie(id) {
        try {
            await this.prisma.movies.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Xatolik: ${error.message}`);
        }
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MovieService);
//# sourceMappingURL=movie.service.js.map