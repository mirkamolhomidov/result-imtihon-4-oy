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
exports.AdminSubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../common/guards/auth.guard");
const subscription_dto_1 = require("./dto/subscription.dto");
const subscription_service_1 = require("./subscription.service");
let AdminSubscriptionController = class AdminSubscriptionController {
    subscriptionService;
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    async createSubscriptionController(createPlanDto) {
        const data = await this.subscriptionService.createSubscriptionPlan(createPlanDto);
        return {
            success: true,
            message: "Subscription muvaffaqiyatli qo'shildi",
            data,
        };
    }
    async updateSubscriptionController(id, updatePlanDto) {
        const data = await this.subscriptionService.updateSubscriptionPlan(id, updatePlanDto);
        return {
            success: true,
            message: 'SubscriptionPlan muvaffaqiyatli yangilandi',
            data,
        };
    }
    async deleteSubscriptionController(id) {
        await this.subscriptionService.deleteSubscriptionPlan(id);
        return {
            success: true,
            message: "SubscriptionPlan muvaffaqiyatli o'chirildi",
        };
    }
};
exports.AdminSubscriptionController = AdminSubscriptionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.CreatePlanDto]),
    __metadata("design:returntype", Promise)
], AdminSubscriptionController.prototype, "createSubscriptionController", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subscription_dto_1.UpdatePlanDto]),
    __metadata("design:returntype", Promise)
], AdminSubscriptionController.prototype, "updateSubscriptionController", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSubscriptionController.prototype, "deleteSubscriptionController", null);
exports.AdminSubscriptionController = AdminSubscriptionController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('admin/subscription/plans'),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], AdminSubscriptionController);
//# sourceMappingURL=subscription.admin.controller.js.map