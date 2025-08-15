import { IsOptional, IsString } from 'class-validator';

export class QueryReadingsDto {
  @IsString() deviceId!: string;
  @IsOptional() @IsString() from?: string; // ISO date
  @IsOptional() @IsString() to?: string;   // ISO date
  @IsOptional() limit?: number;
}
