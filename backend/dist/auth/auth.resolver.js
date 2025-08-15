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
import { Resolver, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { AuthService } from './auth.service.js';
import { Public } from '../common/public.decorator.js';
let LoginPayload = class LoginPayload {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], LoginPayload.prototype, "access_token", void 0);
LoginPayload = __decorate([
    ObjectType()
], LoginPayload);
let AuthResolver = class AuthResolver {
    constructor(auth) {
        this.auth = auth;
    }
    async login(email, password) {
        const res = await this.auth.login(email, password);
        return { access_token: res.access_token };
    }
};
__decorate([
    Public(),
    Mutation(() => LoginPayload),
    __param(0, Args('email')),
    __param(1, Args('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
AuthResolver = __decorate([
    Resolver(),
    __metadata("design:paramtypes", [AuthService])
], AuthResolver);
export { AuthResolver };
//# sourceMappingURL=auth.resolver.js.map