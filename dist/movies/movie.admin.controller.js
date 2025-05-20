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
exports.MovieAdminController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const auth_guard_1 = require("../common/guards/auth.guard");
const uuid_1 = require("uuid");
const movie_dto_1 = require("./dto/movie.dto");
const movie_service_1 = require("./movie.service");
let MovieAdminController = class MovieAdminController {
    movieService;
    constructor(movieService) {
        this.movieService = movieService;
    }
    async getMovies() {
        const data = await this.movieService.getMoviesAdmin();
        return { success: true, data };
    }
    async createMovieController(req, poster, createMovieDto) {
        return await this.movieService.createMovie(createMovieDto, req.user.user_id, poster.filename, createMovieDto.category_ids);
    }
    async uploadMovieFile(movie_id, file, body) {
        return this.movieService.addMovieFile(movie_id, file.filename, body);
    }
    async updateMovieController(id, updateMovieDto) {
        return await this.movieService.updateMovie(updateMovieDto, id);
    }
    async deleteMovie(id) {
        await this.movieService.deleteMovie(id);
        return { success: true, message: "Movie muvaffaqiyatli o'chirildi" };
    }
};
exports.MovieAdminController = MovieAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieAdminController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('poster', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const ext = (0, path_1.extname)(file.originalname);
                const uniqueName = (0, uuid_1.v4)() + ext;
                cb(null, uniqueName);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, movie_dto_1.CreateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieAdminController.prototype, "createMovieController", null);
__decorate([
    (0, common_1.Post)(':movie_id/files'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/movies',
            filename: (req, file, cb) => {
                const ext = (0, path_1.extname)(file.originalname);
                const name = (0, uuid_1.v4)() + ext;
                cb(null, name);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('movie_id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, movie_dto_1.CreateMovieFileDto]),
    __metadata("design:returntype", Promise)
], MovieAdminController.prototype, "uploadMovieFile", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, movie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieAdminController.prototype, "updateMovieController", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieAdminController.prototype, "deleteMovie", null);
exports.MovieAdminController = MovieAdminController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('admin/movies'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieAdminController);
//# sourceMappingURL=movie.admin.controller.js.map