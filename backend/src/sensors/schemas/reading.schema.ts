import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Reading {
  @Prop({ required: true }) deviceId!: string;
  @Prop({ required: true }) temperature!: number; // Celsius
  @Prop({ required: true }) humidity!: number;    // Percentage
  @Prop({ required: true }) power!: number;       // Watts
  @Prop({ default: () => new Date() }) timestamp!: Date;
}

export type ReadingDocument = HydratedDocument<Reading>;
export const ReadingSchema = SchemaFactory.createForClass(Reading);
ReadingSchema.index({ deviceId: 1, timestamp: -1 });
