import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema.js';
import { RegisterDto } from './dto/register.dto.js';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();

    const existing = await this.userModel.findOne({ email });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const created = await this.userModel.create({
      email,
      passwordHash,
      role: dto.role ?? 'User',
    });

    return { id: created._id.toString(), email: created.email, role: created.role };
  }

  private async validateUser(email: string, password: string) {
    const normalized = email.trim().toLowerCase();

    // passwordHash is defined with { select: false } in the schema
    const user = await this.userModel.findOne({ email: normalized }).select('+passwordHash');
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user._id.toString(), email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: { id: user._id.toString(), email: user.email, role: user.role },
    };
  }
}
