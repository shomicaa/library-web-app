import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RatingEntity, RatingId } from '../database/entities/rating.entity';
import { CreateRatingModel, RatingModel, UpdateRatingModel } from './rating.model';
import { BookId } from '../database/entities/books.entity';

@Injectable()
export class RatingRepository {
  private readonly ratingRepository = this.dataSource.getRepository(RatingEntity);

  constructor(private readonly dataSource: DataSource) {}

  public async getRatings(
    bookId: string,
    sortBy?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC'): Promise<RatingModel[]> {

    const query = this.ratingRepository.createQueryBuilder('rating').where('rating.bookId = :bookId', { bookId });

    // We just need the sorting functionality
    if (sortBy) {
      query.orderBy(`rating.${sortBy}`, sortOrder);
    }
  
    return query.getMany();
  }

  public async getRatingById(id: string): Promise<RatingModel | null> {
    return this.ratingRepository.findOne({where: { id: id as RatingId }, relations: ['book']});
  }

  public async addRating(input: CreateRatingModel): Promise<RatingModel> {
    return this.ratingRepository.save(this.ratingRepository.create(input));
  }

  public async updateRating(id: string, input: UpdateRatingModel): Promise<RatingModel> {
    await this.ratingRepository.update(id, input);
    return this.getRatingById(id);
  }

  public async deleteRating(id: string): Promise<boolean> {
    const result = await this.ratingRepository.delete(id);
    return result.affected > 0;
  }
}