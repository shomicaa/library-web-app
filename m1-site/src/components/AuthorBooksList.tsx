import React, { useState } from "react";
import Link from "next/link";
import { BookModel } from "../models/BookModel";
import { IconButton } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import DeleteBookModal from "./modals/DeleteBookModal";
import CreateBookModal from "./modals/CreateBookModal";
import { AuthorModel } from "../models/AuthorModel";
import { CreateBookModel } from "../models/BookModel";

interface AuthorBooksListProps {
  books: BookModel[];
  onDeleteBook: (bookId: string) => void;
  onCreateBook: (book: CreateBookModel) => void;
  authors: AuthorModel[];
  currentAuthorId: string;
}

export const AuthorBooksList: React.FC<AuthorBooksListProps> = ({
  books,
  onDeleteBook,
  onCreateBook,
  authors,
  currentAuthorId,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleDeleteClick = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedBookId) {
      onDeleteBook(selectedBookId);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateBook = (book: CreateBookModel) => {
    onCreateBook(book);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Books Written</h2>
        {/* Add the "+" icon button */}
        <IconButton
          aria-label="add"
          onClick={handleCreateClick}
          sx={{
            color: "rgba(0, 0, 0, 0.54)",
          }}
        >
          <Add fontSize="small" /> {/* Use a small add icon */}
        </IconButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-gray-200 hover:border-gray-300 relative"
          >
            <Link href={`/books/${book.id}`}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {book.title}
                </h3>
                <p className="text-gray-600">
                  <strong>Published Year:</strong> {book.publishedYear}
                </p>
                <p className="text-gray-600">
                  <strong>Average Rating:</strong>{" "}
                  {book?.averageRating === 0
                    ? "NaN"
                    : `${book?.averageRating.toFixed(2)}/5`}
                </p>
              </div>
            </Link>
            {/* Add the delete button in the bottom right corner */}
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteClick(book.id)}
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                color: "rgba(0, 0, 0, 0.26)",
              }}
            >
              <Delete fontSize="small" /> {/* Use a small delete icon */}
            </IconButton>
          </div>
        ))}
      </div>

      {/* Delete Book Modal */}
      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteConfirm}
      />

      {/* Create Book Modal */}
      <CreateBookModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateBook}
        authors={authors}
        defaultAuthorId={currentAuthorId}
      />
    </div>
  );
};
