import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Reading, ReadingDocument } from './schemas/reading.schema.js';
import { CreateReadingDto } from './dto/create-reading.dto.js';

@Injectable()
export class SensorsService {
  constructor(@InjectModel(Reading.name) private readonly model: Model<ReadingDocument>) {}

  // One canonical writer
  async ingest(dto: CreateReadingDto) {
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
    const pipeline: PipelineStage[] = [
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
  async history(deviceId: string, from?: Date, to?: Date, limit = 200) {
    const q: any = { deviceId };
    if (from || to) {
      q.timestamp = {};
      if (from) q.timestamp.$gte = from;
      if (to) q.timestamp.$lte = to;
    }
    return this.model.find(q).sort({ timestamp: 1 }).limit(limit).lean().exec();
  }
  async create(dto: CreateReadingDto) {
  return this.ingest(dto);
}
}
