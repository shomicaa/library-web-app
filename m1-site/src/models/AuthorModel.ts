export type AuthorModel = {
  id: string;
  name: string;
  biography: string;
  numberOfBooksWritten: number;
  averageRating: number;
  photoURL: string;
};

export type CreateAuthorModel = {
  name: string;
  biography?: string;
  photoURL?: string;
};

export type UpdateAuthorModel = {
  name?: string;
  biography?: string;
  photoURL?: string;
};
