"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useBooks } from "../../../hooks/useBooks";
import { useAuthors } from "../../../hooks/useAuthors";
import { useRatings } from "../../../hooks/useRatings";
import Link from "next/link";
import { PageTitle } from "../../../components/PageTitle";
import DeleteBookModal from "../../../components/modals/DeleteBookModal";
import { RatingInput } from "../../../components/RatingInput";
import { RatingsDrawer } from "../../../components/RatingsDrawer";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import EditBookModal from "../../../components/modals/EditBookModal";
import { BookModel, UpdateBookModel } from "../../../models/BookModel";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { book, loading, error, fetchBookById, deleteBook, updateBook } =
    useBooks();
  const { author, fetchAuthorById, authors, fetchAuthors } = useAuthors();
  const {
    ratings,
    loading: ratingsLoading,
    error: ratingsError,
    fetchRatings,
    addRating,
    deleteRating,
  } = useRatings();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (id) {
      fetchBookById(id).then((fetchedBook) => {
        if (fetchedBook?.authorId) {
          fetchAuthorById(fetchedBook.authorId);
        }
      });
      fetchRatings(id);
      fetchAuthors();
    }
  }, [id, fetchBookById, fetchAuthorById, fetchRatings]);

  const handleAddRating = async (stars: number, comment?: string) => {
    await addRating(id, { stars, comment, bookId: id });
    fetchRatings(id);
    fetchBookById(id);
  };

  const handleDelete = () => {
    if (id) {
      deleteBook(id).then(() => {
        setIsDeleteModalOpen(false);
      });
    }
  };

  const handleUpdateBook = async (updatedBook: UpdateBookModel) => {
    if (id) {
      await updateBook(id, updatedBook);
      fetchBookById(id).then((fetchedBook) => {
        if (fetchedBook?.authorId) {
          fetchAuthorById(fetchedBook.authorId);
        }
      });
      setIsEditModalOpen(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading book details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center space-x-2">
        <PageTitle title={book?.title || "Book Details"} />
        <IconButton
          aria-label="edit"
          onClick={() => setIsEditModalOpen(true)}
          sx={{
            color: "rgba(0, 0, 0, 0.54)",
            marginTop: "-12px",
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="space-y-6">
          <p className="text-gray-700">
            <strong>Author:</strong>{" "}
            {author ? (
              <Link
                href={`/authors/${author.id}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {author.name}
              </Link>
            ) : (
              "Unknown"
            )}
          </p>
          <p className="text-gray-700">
            <strong>Published Year:</strong> {book?.publishedYear || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Price:</strong> ${book?.price || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Rating:</strong>{" "}
            {book?.averageRating === 0
              ? "NaN"
              : `${book?.averageRating.toFixed(2)}/5`}
          </p>
        </div>

        {/* Rating Input */}
        <div className="space-y-4">
          <Typography variant="h6" className="text-gray-800">
            Rate this book
          </Typography>
          <RatingInput onSubmit={handleAddRating} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="/books">
              <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105">
                Go back
              </button>
            </Link>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              View Ratings
            </button>
          </div>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
          >
            Delete Book
          </button>
        </div>
      </div>

      {/* Ratings Drawer */}
      <RatingsDrawer
        ratings={ratings}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onDeleteRating={deleteRating}
      />

      {/* Delete Book Modal */}
      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />

      {/* Edit Book Modal */}
      <EditBookModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateBook}
        book={book}
        authors={authors}
      />
    </div>
  );
}
