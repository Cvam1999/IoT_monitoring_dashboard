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
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reading } from './schemas/reading.schema.js';
let SensorsService = class SensorsService {
    constructor(model) {
        this.model = model;
    }
    // One canonical writer
    async ingest(dto) {
        const doc = await this.model.create({
            deviceId: dto.deviceId.trim(),
            temperature: dto.temperature,
            humidity: dto.humidity,
            power: dto.power,
            timestamp: dto.timestamp ? new Date(dto.timestamp) : new Date(),
        });
        // return shape the controller/UI expects
        return { id: doc._id.toString(), deviceId: doc.deviceId, timestamp: doc.timestamp };
    }
    // Latest row per device
    async latestPerDevice() {
        const pipeline = [
            { $sort: { deviceId: 1, timestamp: -1 } },
            {
                $group: {
                    _id: '$deviceId',
                    deviceId: { $first: '$deviceId' },
                    temperature: { $first: '$temperature' },
                    humidity: { $first: '$humidity' },
                    power: { $first: '$power' },
                    timestamp: { $first: '$timestamp' },
                },
            },
            { $project: { _id: 0, deviceId: 1, temperature: 1, humidity: 1, power: 1, timestamp: 1 } },
        ];
        return this.model.aggregate(pipeline).exec();
    }
    // History (oldest->newest is nicer for charts; switch to -1 if you prefer newest first)
    async history(deviceId, from, to, limit = 200) {
        const q = { deviceId };
        if (from || to) {
            q.timestamp = {};
            if (from)
                q.timestamp.$gte = from;
            if (to)
                q.timestamp.$lte = to;
        }
        return this.model.find(q).sort({ timestamp: 1 }).limit(limit).lean().exec();
    }
    async create(dto) {
        return this.ingest(dto);
    }
};
SensorsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Reading.name)),
    __metadata("design:paramtypes", [Model])
], SensorsService);
export { SensorsService };
//# sourceMappingURL=sensors.service.js.map