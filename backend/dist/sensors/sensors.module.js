var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reading, ReadingSchema } from './schemas/reading.schema.js';
import { SensorsService } from './sensors.service.js';
import { SensorsController } from './sensors.controller.js';
import { SensorsResolver } from './sensors.resolver.js';
import { EventsGateway } from '../gateway/events.gateway.js';
let SensorsModule = class SensorsModule {
};
SensorsModule = __decorate([
    Module({
        imports: [
            MongooseModule.forFeature([{ name: Reading.name, schema: ReadingSchema }]),
        ],
        providers: [SensorsService, SensorsResolver, EventsGateway],
        controllers: [SensorsController],
        exports: [SensorsService],
    })
], SensorsModule);
export { SensorsModule };
//# sourceMappingURL=sensors.module.js.map