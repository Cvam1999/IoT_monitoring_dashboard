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
import { Resolver, Query, Args, ObjectType, Field, Int, Mutation } from '@nestjs/graphql';
import { SensorsService } from './sensors.service.js';
let ReadingType = class ReadingType {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], ReadingType.prototype, "deviceId", void 0);
__decorate([
    Field(),
    __metadata("design:type", Number)
], ReadingType.prototype, "temperature", void 0);
__decorate([
    Field(),
    __metadata("design:type", Number)
], ReadingType.prototype, "humidity", void 0);
__decorate([
    Field(),
    __metadata("design:type", Number)
], ReadingType.prototype, "power", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], ReadingType.prototype, "timestamp", void 0);
ReadingType = __decorate([
    ObjectType()
], ReadingType);
let SensorsResolver = class SensorsResolver {
    constructor(sensors) {
        this.sensors = sensors;
    }
    async readings(deviceId, from, to, limit) {
        const fromDate = from ? new Date(from) : undefined;
        const toDate = to ? new Date(to) : undefined;
        return this.sensors.history(deviceId, fromDate, toDate, limit ?? 200);
    }
    async createReading(deviceId, temperature, humidity, power, timestamp) {
        return this.sensors.create({ deviceId, temperature, humidity, power, timestamp });
    }
};
__decorate([
    Query(() => [ReadingType]),
    __param(0, Args('deviceId')),
    __param(1, Args('from', { nullable: true })),
    __param(2, Args('to', { nullable: true })),
    __param(3, Args('limit', { type: () => Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Promise)
], SensorsResolver.prototype, "readings", null);
__decorate([
    Mutation(() => ReadingType),
    __param(0, Args('deviceId')),
    __param(1, Args('temperature')),
    __param(2, Args('humidity')),
    __param(3, Args('power')),
    __param(4, Args('timestamp', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], SensorsResolver.prototype, "createReading", null);
SensorsResolver = __decorate([
    Resolver(() => ReadingType),
    __metadata("design:paramtypes", [SensorsService])
], SensorsResolver);
export { SensorsResolver };
//# sourceMappingURL=sensors.resolver.js.map