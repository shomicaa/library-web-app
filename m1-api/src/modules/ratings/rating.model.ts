import { RatingId } from "../database/entities/rating.entity";
import { BookId } from "../database/entities/books.entity";
import { BookModel } from "../books/book.model";

export type RatingModel = {
  id: RatingId;
  stars: number;
  comment: string;
  createdAt: Date;
  bookId: BookId;
  book?: BookModel;
};

export type CreateRatingModel = {
  stars: number;
  comment?: string;
  bookId: BookId;
};

export type UpdateRatingModel = {
  stars?: number;
  comment?: string;
};
