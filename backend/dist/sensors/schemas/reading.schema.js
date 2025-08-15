var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
let Reading = class Reading {
};
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], Reading.prototype, "deviceId", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", Number)
], Reading.prototype, "temperature", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", Number)
], Reading.prototype, "humidity", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", Number)
], Reading.prototype, "power", void 0);
__decorate([
    Prop({ default: () => new Date() }),
    __metadata("design:type", Date)
], Reading.prototype, "timestamp", void 0);
Reading = __decorate([
    Schema({ timestamps: true })
], Reading);
export { Reading };
export const ReadingSchema = SchemaFactory.createForClass(Reading);
ReadingSchema.index({ deviceId: 1, timestamp: -1 });
//# sourceMappingURL=reading.schema.js.map