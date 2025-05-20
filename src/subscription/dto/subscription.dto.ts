import { Payment_method, Prisma } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDecimal()
  @IsNotEmpty()
  price: any;

  @IsNumber()
  @IsNotEmpty()
  duration_days: number;

  @IsArray()
  features: string;
}

export class UpdatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDecimal()
  @IsNotEmpty()
  price: any;

  @IsNumber()
  @IsNotEmpty()
  duration_days: number;

  @IsArray()
  features: string;
}

export class PurchaseDto {
  @IsString()
  @IsNotEmpty()
  plan_id: string;

  @IsNotEmpty()
  @IsEnum(Payment_method)
  payment_method: Payment_method;

  @IsBoolean()
  @IsNotEmpty()
  auto_renew: Boolean;

  @IsJSON()
  @IsNotEmpty()
  payment_details: Prisma.InputJsonValue;
}
