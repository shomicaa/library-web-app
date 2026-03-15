import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { BookModel, CreateBookModel, UpdateBookModel } from './book.model';
import { AuthorService } from '../authors/author.service';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorService: AuthorService,
  ) {}

  public async getBooks(
    search?: string,
    sortBy?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    limit?: number,
    offset?: number,
    authorId?: string,
  ): Promise<BookModel[]> {
    return this.bookRepository.getBooks(
      search,
      sortBy,
      sortOrder,
      limit,
      offset,
      authorId,
    );
  }

  public async getBook(id: string): Promise<BookModel> {
    const book = await this.bookRepository.getBook(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  public async createBook(input: CreateBookModel): Promise<BookModel> {
    const book = await this.bookRepository.createBook(input); 
    // Update numberOfBooksWritten for the author
    if (book.authorId) {
      await this.authorService.updateNumberOfBooksWritten(book.authorId);
    }
    return book;
  }

  public async updateBook(
    id: string,
    input: UpdateBookModel,
  ): Promise<BookModel> {
    // Here we also handle the edge case where a book changes the author and we need to adjust the
    // averageRating for the authors and the number of books written by those authors
    const oldBook = await this.bookRepository.getBook(id);
    if (!oldBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    const updatedBook = await this.bookRepository.updateBook(id, input);

    // Recalculate averageRating for the old author (if the authorId changed)
    if (oldBook.authorId !== updatedBook.authorId) {
      await this.authorService.updateAuthorAverageRating(oldBook.authorId);
      await this.authorService.updateNumberOfBooksWritten(oldBook.authorId);
    }

    // Recalculate averageRating for the new author
    if (updatedBook.authorId) {
      await this.authorService.updateAuthorAverageRating(updatedBook.authorId);
      await this.authorService.updateNumberOfBooksWritten(updatedBook.authorId);
    }

    return updatedBook;
  }

  public async deleteBook(id: string): Promise<void> {
    const book = await this.bookRepository.getBook(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    await this.bookRepository.deleteBook(id);

    // Update numberOfBooksWritten for the author
    if (book.authorId) {
      await this.authorService.updateNumberOfBooksWritten(book.authorId);
    }
  }
}
