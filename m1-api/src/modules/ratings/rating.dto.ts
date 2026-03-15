import { IsString, IsNumber, IsInt, IsOptional, IsUUID, Min, Max } from 'class-validator';
import { RatingId } from '../database/entities/rating.entity';
import { BookId } from '../database/entities/books.entity';

export class CreateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;

  @IsString()
  @IsOptional()
  comment?: string;
}

export class UpdateRatingDto {
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(5)
  stars: number;

  @IsString()
  @IsOptional()
  comment?: string;
}