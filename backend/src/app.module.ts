import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { AuthModule } from './auth/auth.module.js';
import { SensorsModule } from './sensors/sensors.module.js';
import { EventsGateway } from './gateway/events.gateway.js';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://shivamgupta27101999:*******@dashboard.rwz0egl.mongodb.net/"),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'dist/schema.gql'),
      path: '/graphql',
      playground: true,
      sortSchema: true,
    }),
    AuthModule,
    SensorsModule,
  ],
//  providers: [EventsGateway],
})
export class AppModule {}
