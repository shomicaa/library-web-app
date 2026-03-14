import { IsString, IsNumber, IsInt, IsOptional, IsUUID } from 'class-validator';
import { AuthorId } from '../database/entities/author.entity';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsInt()
  publishedYear: number;

  @IsNumber()
  price: number;

  @IsUUID()
  @IsOptional()
  authorId: AuthorId;
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsInt()
  @IsOptional()
  publishedYear: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsUUID()
  @IsOptional()
  authorId: AuthorId;
}
