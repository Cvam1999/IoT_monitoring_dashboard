import { IsNumber, IsString } from 'class-validator';

export class CreateReadingDto {
  @IsString() deviceId!: string;
  @IsNumber() temperature!: number;
  @IsNumber() humidity!: number;
  @IsNumber() power!: number;
  timestamp?: string;
}
