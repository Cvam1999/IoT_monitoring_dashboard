// src/gateway/events.gateway.ts
import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectModel, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reading, ReadingDocument } from '../sensors/schemas/reading.schema.js';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer() server!: Server;

  constructor(
    @InjectModel(Reading.name) // this is fine, but to be extra explicit use the next line instead:
    // @Inject(getModelToken(Reading.name))
    private model: Model<ReadingDocument>,
  ) {
    try {
      const changeStream = this.model.watch([], { fullDocument: 'updateLookup' });
      changeStream.on('change', (change: any) => {
        if (change.operationType === 'insert') {
          const doc = change.fullDocument;
          this.server.emit('reading:new', {
            deviceId: doc.deviceId,
            temperature: doc.temperature,
            humidity: doc.humidity,
            power: doc.power,
            timestamp: doc.timestamp,
          });
        }
      });
    } catch (e) {
      console.warn('Change stream not enabled (Mongo non-replica?). New readings will still be pushed when API is used.');
    }
  }

  handleConnection() {/* no-op */}
}
