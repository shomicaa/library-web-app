import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from './author.model';
import { BookRepository } from '../books/book.repository';

// Its what serves the data to the repository
@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly bookRepository: BookRepository
  ) {}

  public async getAuthors(
    search?: string,
    sortBy?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    limit?: number,
    offset?: number,
  ): Promise<AuthorModel[]> {
    return this.authorRepository.getAuthors(
      search,
      sortBy,
      sortOrder,
      limit,
      offset,
    );
  }

  public async getAuthorById(id: string): Promise<AuthorModel> {
    const author = await this.authorRepository.getAuthorById(id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  public async createAuthor(input: CreateAuthorModel) {
    return this.authorRepository.createAuthor(input);
  }

  public async updateAuthor(
    id: string,
    input: UpdateAuthorModel,
  ): Promise<AuthorModel> {
    const author = await this.authorRepository.updateAuthor(id, input);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  public async deleteAuthor(id: string): Promise<void> {
    const result = await this.authorRepository.deleteAuthor(id);
    if (!result) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
  }

  // This method calculates the average rating of an author based on the average rating of their books.
  // It will be called from the RatingService everytime there is a new rating or an update of a rating.
  // It will also be called from the BookService when a book is updated and the authorId changes.

  public async updateAuthorAverageRating(authorId: string): Promise<void> {
    const books = await this.bookRepository.getBooks();
    const authorBooks = books.filter((book) => book.authorId === authorId);

    // Filter out books with no reviews (averageRating === 0)
    const booksWithReviews = authorBooks.filter(
      (book) => book.averageRating > 0,
    );

    // Calculate the average rating only for books with reviews
    const totalRatings = booksWithReviews.reduce(
      (sum, book) => sum + book.averageRating,
      0,
    );
    const averageRating = booksWithReviews.length > 0 ? totalRatings / booksWithReviews.length : 0;

    await this.authorRepository.updateAuthor(authorId, { averageRating }); 
  }

  // This method calculates the number of books written by an author.

  public async updateNumberOfBooksWritten(authorId: string): Promise<void> {
    const books = await this.bookRepository.getBooks();
    const numberOfBooksWritten = books.filter(
      (book) => book.authorId === authorId,
    ).length;

    await this.authorRepository.updateAuthor(authorId, {
      numberOfBooksWritten,
    });
  }
}
