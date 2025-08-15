import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SensorsService } from './sensors.service.js';
import { CreateReadingDto } from './dto/create-reading.dto.js';
import { QueryReadingsDto } from './dto/query-readings.dto.js';
import { JwtAuthGuard } from '../common/jwt-auth.guard.js';
import { RolesGuard } from '../common/roles.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { Role } from '../common/roles.enum.js';

@Controller('sensors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SensorsController {
  constructor(private readonly sensors: SensorsService) {}

  @Roles(Role.Admin)
  @Post('ingest')
  async ingest(@Body() dto: CreateReadingDto) {
    // service method is "ingest", not "create"
    const created = await this.sensors.ingest(dto);
    return { ok: true, created };
  }

  @Roles(Role.User, Role.Admin)
  @Get('latest')
  async latest() {
    return this.sensors.latestPerDevice();
  }

  @Roles(Role.User, Role.Admin)
  @Get('history')
  async history(@Query() query: QueryReadingsDto) {
    const from = query.from ? new Date(query.from) : undefined;
    const to = query.to ? new Date(query.to) : undefined;
    const limit = query.limit ? Number(query.limit) : 200;
    return this.sensors.history(query.deviceId, from, to, limit);
  }
}
