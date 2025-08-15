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
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SensorsService } from './sensors.service.js';
import { CreateReadingDto } from './dto/create-reading.dto.js';
import { QueryReadingsDto } from './dto/query-readings.dto.js';
import { JwtAuthGuard } from '../common/jwt-auth.guard.js';
import { RolesGuard } from '../common/roles.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { Role } from '../common/roles.enum.js';
let SensorsController = class SensorsController {
    constructor(sensors) {
        this.sensors = sensors;
    }
    async ingest(dto) {
        // service method is "ingest", not "create"
        const created = await this.sensors.ingest(dto);
        return { ok: true, created };
    }
    async latest() {
        return this.sensors.latestPerDevice();
    }
    async history(query) {
        const from = query.from ? new Date(query.from) : undefined;
        const to = query.to ? new Date(query.to) : undefined;
        const limit = query.limit ? Number(query.limit) : 200;
        return this.sensors.history(query.deviceId, from, to, limit);
    }
};
__decorate([
    Roles(Role.Admin),
    Post('ingest'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReadingDto]),
    __metadata("design:returntype", Promise)
], SensorsController.prototype, "ingest", null);
__decorate([
    Roles(Role.User, Role.Admin),
    Get('latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SensorsController.prototype, "latest", null);
__decorate([
    Roles(Role.User, Role.Admin),
    Get('history'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryReadingsDto]),
    __metadata("design:returntype", Promise)
], SensorsController.prototype, "history", null);
SensorsController = __decorate([
    Controller('sensors'),
    UseGuards(JwtAuthGuard, RolesGuard),
    __metadata("design:paramtypes", [SensorsService])
], SensorsController);
export { SensorsController };
//# sourceMappingURL=sensors.controller.js.map