import { AuthorModel } from '../authors/author.model';
import { AuthorId } from '../database/entities/author.entity';
import { BookId } from '../database/entities/books.entity';

export type BookModel = {
  id: BookId;
  author: AuthorModel;
  title: string;
  publishedYear: number;
  price: number;
  averageRating: number;
  authorId: AuthorId;
};

export type CreateBookModel = {
  title: string;
  publishedYear: number;
  price: number;
  averageRating?: number;
  authorId?: string;
};

export type UpdateBookModel = {
  title?: string;
  publishedYear?: number;
  price?: number;
  averageRating?: number;
  authorId?: AuthorId;
};
