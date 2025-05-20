import { Subscription_types } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
  @IsNumberString()
  rating: string;

  @IsNumberString()
  release_year: string;

  @IsNumberString()
  duration_minutes: string;

  @IsEnum(Subscription_types)
  subscription_type: Subscription_types;

  @IsArray()
  category_ids: string[];
}
export class UpdateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Subscription_types)
  subscription_type: Subscription_types;

  @IsArray()
  @IsNotEmpty()
  category_ids: string[];
}
