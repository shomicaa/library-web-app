import { Injectable, NotFoundException } from '@nestjs/common';
import { RatingRepository } from './rating.repository';
import { CreateRatingModel, RatingModel, UpdateRatingModel } from './rating.model';
import { BookRepository } from '../books/book.repository';
import { AuthorService } from '../authors/author.service';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly bookRepository: BookRepository,
    private readonly authorService: AuthorService,
  ) {}

  public async getRatings(
    bookId: string,
    sortBy?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<RatingModel[]> {
    // Validate that the book exists
    const book = await this.bookRepository.getBook(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    return this.ratingRepository.getRatings(bookId, sortBy, sortOrder);
  }

  public async getRatingById(bookId: string, id: string): Promise<RatingModel> {

    // Validate that the book exists
    const book = await this.bookRepository.getBook(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    const rating = await this.ratingRepository.getRatingById(id);
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
    return rating;
  }

  public async addRating(input: CreateRatingModel): Promise<RatingModel> {

    // Validate that the book exists
    const book = await this.bookRepository.getBook(input.bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${input.bookId} not found`);
    }

    // Add the rating and update the average rating after
    const rating = await this.ratingRepository.addRating(input);
    await this.updateAverageRating(input.bookId);
    return rating;
  }

  public async updateRating(
    bookId: string,
    id: string,
    input: UpdateRatingModel,
  ): Promise<RatingModel> {
    // Validate that the book exists 
    if (bookId) {
      const book = await this.bookRepository.getBook(bookId);
      if (!book) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
    }

    // Validate that the rating exists
    const rating = await this.ratingRepository.getRatingById(id);
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    // Update the rating and update the average rating after
    // Here we also need to adress the edge case where we change the review to belong to another book
    const oldRating = await this.ratingRepository.getRatingById(id); 
    const updatedRating = await this.ratingRepository.updateRating(id, input); 

    // Recalculate averageRating for the old book (if the bookId changed)
    if (oldRating.bookId !== updatedRating.bookId) {
      await this.updateAverageRating(oldRating.bookId);
    }
    // Recalculate averageRating for the new book
    await this.updateAverageRating(updatedRating.bookId);

    return updatedRating;
  }

  public async deleteRating(bookId: string, id: string): Promise<void> {
    // Validate that the book exists
    const book = await this.bookRepository.getBook(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    
    // Delete the rating and update the average rating after
    const rating = await this.ratingRepository.getRatingById(id);
    const result = await this.ratingRepository.deleteRating(id);
    if (!result) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
    await this.updateAverageRating(rating.bookId);
  }

  // Here we implemented a method to update the average rating of a book and the author

  public async updateAverageRating(bookId: string): Promise<void> {
    const ratings = await this.ratingRepository.getRatings(bookId); 
    const totalRatings = ratings.reduce((sum, rating) => sum + rating.stars, 0);
    const averageRating = ratings.length > 0 ? totalRatings / ratings.length : 0;
  
    await this.bookRepository.updateBook(bookId, { averageRating });
    
    // Update the author's average rating
    const book = await this.bookRepository.getBook(bookId); // Use existing method
    if (book.authorId) {
      await this.authorService.updateAuthorAverageRating(book.authorId);
    }
  }
}