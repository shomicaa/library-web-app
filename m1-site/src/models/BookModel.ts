import { AuthorModel } from "./AuthorModel";

export type BookModel = {
  id: string;
  author?: AuthorModel;
  title: string;
  publishedYear: number;
  price: number;
  averageRating: number;
  authorId: string;
};

export type CreateBookModel = {
  title: string;
  publishedYear: number;
  price: number;
  authorId: string;
};

export type UpdateBookModel = {
  title?: string;
  publishedYear?: number;
  price?: number;
  authorId?: string;
};
