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
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema.js';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const email = dto.email.trim().toLowerCase();
        const existing = await this.userModel.findOne({ email });
        if (existing)
            throw new ConflictException('Email already registered');
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const created = await this.userModel.create({
            email,
            passwordHash,
            role: dto.role ?? 'User',
        });
        return { id: created._id.toString(), email: created.email, role: created.role };
    }
    async validateUser(email, password) {
        const normalized = email.trim().toLowerCase();
        // passwordHash is defined with { select: false } in the schema
        const user = await this.userModel.findOne({ email: normalized }).select('+passwordHash');
        if (!user)
            throw new UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok)
            throw new UnauthorizedException('Invalid credentials');
        return user;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        const payload = { sub: user._id.toString(), email: user.email, role: user.role };
        const access_token = await this.jwtService.signAsync(payload);
        return {
            access_token,
            user: { id: user._id.toString(), email: user.email, role: user.role },
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __param(0, InjectModel(User.name)),
    __metadata("design:paramtypes", [Model,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map