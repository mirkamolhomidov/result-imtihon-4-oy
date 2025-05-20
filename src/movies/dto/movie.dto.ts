import { MovieQuality, Subscription_types } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
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

export enum SubscriptionType {
  FREE = 'free',
  PREMIUM = 'premium',
}

export class FilterMoviesDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(SubscriptionType)
  subscription_type?: SubscriptionType;
}
export class CreateMovieFileDto {
  @IsEnum(MovieQuality)
  quality: MovieQuality;

  @IsString()
  @IsNotEmpty()
  language: string;
}
