import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reading, ReadingSchema } from './schemas/reading.schema.js';
import { SensorsService } from './sensors.service.js';
import { SensorsController } from './sensors.controller.js';
import { SensorsResolver } from './sensors.resolver.js';
import { EventsGateway } from '../gateway/events.gateway.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reading.name, schema: ReadingSchema }]),
  ],
   providers: [SensorsService, SensorsResolver, EventsGateway],
  controllers: [SensorsController],
  exports: [SensorsService],
})
export class SensorsModule {}
