import { useState, useCallback } from "react";
import api from "../lib/api";
import { BookModel, CreateBookModel, UpdateBookModel } from "../models/BookModel";

export const useBooks = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [book, setBook] = useState<BookModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all books
  const fetchBooks = useCallback(async (search?: string, sortBy: string = "title", sortOrder: "ASC" | "DESC" = "ASC") => {
    setLoading(true);
    setError(null);
    try {
      const params = { search, sortBy, sortOrder };
      const response = await api.get<BookModel[]>("books", { params });
      setBooks(response.data);
    } catch (error) {
      setError("Failed to fetch books.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single book by ID
  const fetchBookById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<BookModel>(`books/${id}`);
      setBook(response.data);
      return response.data;
    } catch (error) {
      setError("Failed to fetch book details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch books by author ID
  const fetchBooksByAuthorId = useCallback(async (authorId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<BookModel[]>(`books?authorId=${authorId}`);
      setBooks(response.data);
    } catch (error) {
      setError("Failed to fetch books by author.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new book
  const createBook = async (newBook: CreateBookModel) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<BookModel>("books", newBook);
      setBooks((prevBooks) => [...prevBooks, response.data]);
    } catch (error) {
      setError("Failed to create book.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Update a book
  const updateBook = async (id: string, updatedBook: UpdateBookModel) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch<BookModel>(`books/${id}`, updatedBook);
      setBook(response.data);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? response.data : book))
      );
    } catch (error) {
      setError("Failed to update book.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a book
  const deleteBook = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      setError("Failed to delete book.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { books, book, loading, error, fetchBooks, fetchBookById, fetchBooksByAuthorId, createBook, updateBook, deleteBook };
};