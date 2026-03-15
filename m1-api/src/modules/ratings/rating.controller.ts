import { Body, Controller, Get, Param, Post, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import {
  RatingModel,
  CreateRatingModel,
  UpdateRatingModel,
} from './rating.model';
import { BookId } from '../database/entities/books.entity';
import { CreateRatingDto, UpdateRatingDto } from './rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books/:bookId/ratings')
@UseGuards(JwtAuthGuard)
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get() // /api/books/:bookId/ratings
  public async getRatings(
    @Param('bookId') bookId: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<RatingModel[]> {
    return this.ratingService.getRatings(bookId, sortBy, sortOrder);
  }

  @Get(':id') // /api/books/:bookId/ratings/:id
  public async getRatingById(
    @Param('bookId') bookId: string,
    @Param('id') id: string,
  ): Promise<RatingModel> {
    return this.ratingService.getRatingById(bookId, id);
  }

  @Post() // /api/books/:bookId/ratings
  public async addRating(
    @Param('bookId') bookId: string,
    @Body() input: CreateRatingDto,
  ): Promise<RatingModel> {
    const createRatingModel: CreateRatingModel = {
      ...input,
      bookId: bookId as BookId, 
    };
    return this.ratingService.addRating(createRatingModel);
  }

  @Patch(':id') // /api/books/:bookId/ratings/:id
  public async updateRating(
    @Param('bookId') bookId: string,
    @Param('id') id: string,
    @Body() input: UpdateRatingDto,
  ): Promise<RatingModel> {
    return this.ratingService.updateRating(bookId, id, input);
  }

  @Delete(':id') // /api/books/:bookId/ratings/:id
  public async deleteRating(
    @Param('bookId') bookId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.ratingService.deleteRating(bookId, id);
  }
}
