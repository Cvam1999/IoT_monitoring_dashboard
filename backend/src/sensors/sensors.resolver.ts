import { Resolver, Query, Args, ObjectType, Field, Int, Mutation } from '@nestjs/graphql';
import { SensorsService } from './sensors.service.js';

@ObjectType()
class ReadingType {
  @Field() deviceId!: string;
  @Field() temperature!: number;
  @Field() humidity!: number;
  @Field() power!: number;
  @Field() timestamp!: Date;
}

@Resolver(() => ReadingType)
export class SensorsResolver {
  constructor(private readonly sensors: SensorsService) {}

  @Query(() => [ReadingType])
  async readings(
    @Args('deviceId') deviceId: string,
    @Args('from', { nullable: true }) from?: string,
    @Args('to', { nullable: true }) to?: string,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;
    return this.sensors.history(deviceId, fromDate, toDate, limit ?? 200);
  }

  @Mutation(() => ReadingType)
  async createReading(
    @Args('deviceId') deviceId: string,
    @Args('temperature') temperature: number,
    @Args('humidity') humidity: number,
    @Args('power') power: number,
    @Args('timestamp', { nullable: true }) timestamp?: string,
  ) {
    return this.sensors.create({ deviceId, temperature, humidity, power, timestamp });
  }
}
