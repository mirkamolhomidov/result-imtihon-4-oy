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
exports.PurchaseDto = exports.UpdatePlanDto = exports.CreatePlanDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreatePlanDto {
    name;
    price;
    duration_days;
    features;
}
exports.CreatePlanDto = CreatePlanDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDecimal)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreatePlanDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "duration_days", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "features", void 0);
class UpdatePlanDto {
    name;
    price;
    duration_days;
    features;
}
exports.UpdatePlanDto = UpdatePlanDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdatePlanDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDecimal)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], UpdatePlanDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdatePlanDto.prototype, "duration_days", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", String)
], UpdatePlanDto.prototype, "features", void 0);
class PurchaseDto {
    plan_id;
    payment_method;
    auto_renew;
    payment_details;
}
exports.PurchaseDto = PurchaseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PurchaseDto.prototype, "plan_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PurchaseDto.prototype, "payment_method", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], PurchaseDto.prototype, "auto_renew", void 0);
__decorate([
    (0, class_validator_1.IsJSON)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], PurchaseDto.prototype, "payment_details", void 0);
//# sourceMappingURL=subscription.dto.js.map