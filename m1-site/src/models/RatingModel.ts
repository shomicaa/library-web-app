import { BookModel } from './BookModel';

export type RatingModel = {
    id: string;
    stars: number;
    comment: string;
    createdAt: Date;
    bookId: string;
    book?: BookModel;
  };
  
  export type CreateRatingModel = {
    stars: number;
    comment?: string;
    bookId: string;
  };
  
  export type UpdateRatingModel = {
    stars?: number;
    comment?: string;
  };