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
exports.CreateMovieFileDto = exports.FilterMoviesDto = exports.SubscriptionType = exports.UpdateMovieDto = exports.CreateMovieDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateMovieDto {
    title;
    description;
    rating;
    release_year;
    duration_minutes;
    subscription_type;
    category_ids;
}
exports.CreateMovieDto = CreateMovieDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "release_year", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "duration_minutes", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.Subscription_types),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "subscription_type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateMovieDto.prototype, "category_ids", void 0);
class UpdateMovieDto {
    title;
    description;
    subscription_type;
    category_ids;
}
exports.UpdateMovieDto = UpdateMovieDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMovieDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMovieDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.Subscription_types),
    __metadata("design:type", String)
], UpdateMovieDto.prototype, "subscription_type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], UpdateMovieDto.prototype, "category_ids", void 0);
var SubscriptionType;
(function (SubscriptionType) {
    SubscriptionType["FREE"] = "free";
    SubscriptionType["PREMIUM"] = "premium";
})(SubscriptionType || (exports.SubscriptionType = SubscriptionType = {}));
class FilterMoviesDto {
    page;
    limit;
    search;
    category;
    subscription_type;
}
exports.FilterMoviesDto = FilterMoviesDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], FilterMoviesDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], FilterMoviesDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterMoviesDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterMoviesDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SubscriptionType),
    __metadata("design:type", String)
], FilterMoviesDto.prototype, "subscription_type", void 0);
class CreateMovieFileDto {
    quality;
    language;
}
exports.CreateMovieFileDto = CreateMovieFileDto;
__decorate([
    (0, class_validator_1.IsEnum)(client_1.MovieQuality),
    __metadata("design:type", String)
], CreateMovieFileDto.prototype, "quality", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovieFileDto.prototype, "language", void 0);
//# sourceMappingURL=movie.dto.js.map