import { CreateBookDto, UpdateBookDto } from './book.dto';
import { BookModel, CreateBookModel } from './book.model';
import { BookService } from './book.service';
import { Controller, Query, UseGuards } from '@nestjs/common';
import { Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get() // /api/books
  public async getBooks(
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('authorId') authorId?: string,
  ): Promise<BookModel[]> {
    return this.bookService.getBooks(search, sortBy, sortOrder, limit, offset, authorId);
  }

  @Get(':id') // /api/books/:id
  public async getBook(@Param('id') id: string): Promise<BookModel> {
    return this.bookService.getBook(id);
  }

  @Post() // /api/books
  public async createBook(@Body() input: CreateBookDto): Promise<BookModel> {
    return this.bookService.createBook(input);
  }

  @Patch(':id') // /api/books/:id
  public async updateBook(
    @Param('id') id: string,
    @Body() input: UpdateBookDto,
  ): Promise<BookModel> {
    return this.bookService.updateBook(id, input);
  }

  @Delete(':id') // /api/books/:id
  public async deleteBook(@Param('id') id: string): Promise<void> {
    return this.bookService.deleteBook(id);
  }
}
