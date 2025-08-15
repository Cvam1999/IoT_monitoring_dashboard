var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module.js';
import { SensorsModule } from './sensors/sensors.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            MongooseModule.forRoot("mongodb+srv://shivamgupta27101999:*******@dashboard.rwz0egl.mongodb.net/"),
            GraphQLModule.forRoot({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map