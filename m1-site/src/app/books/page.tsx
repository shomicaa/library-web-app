"use client";
import React, { useEffect, useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import { useAuthors } from "../../hooks/useAuthors";
import CreateBookModal from "../../components/modals/CreateBookModal";
import DeleteBookModal from "../../components/modals/DeleteBookModal";
import { BookTable } from "../../components/BookTable";
import { CreateBookModel } from "../../models/BookModel";
import { PageTitle } from "../../components/PageTitle";
import { SearchBar } from "../../components/SearchBar";
import { SortDropdown } from "../../components/SortDropdown";
import { SortOrderButton } from "../../components/SortOrderButton";

export default function BookList() {
  const {
    books,
    loading: booksLoading,
    error: booksError,
    fetchBooks,
    createBook,
    deleteBook,
  } = useBooks();

  const {
    authors,
    loading: authorsLoading,
    error: authorsError,
    fetchAuthors,
  } = useAuthors();

  const [isCreateBookModalOpen, setIsCreateBookModalOpen] = useState(false);
  const [isDeleteBookModalOpen, setIsDeleteBookModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  // Sort options for books
  const sortOptions = [
    { value: "title", label: "Sort by Title" },
    { value: "author", label: "Sort by Author" },
    { value: "publishedYear", label: "Sort by Published Year" },
    { value: "averageRating", label: "Sort by Rating" },
  ];

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  // Fetch books when sortBy or sortOrder changes
  useEffect(() => {
    fetchBooks(searchQuery, sortBy, sortOrder);
  }, [sortBy, sortOrder]);

  // Handle search (triggered by Enter or Search button)
  const handleSearch = () => {
    fetchBooks(searchQuery, sortBy, sortOrder);
  };

  // Load books and authors when the component mounts
  useEffect(() => {
    fetchBooks(searchQuery, sortBy, sortOrder);
    fetchAuthors();
  }, []);

  // Handle creating a new book
  const handleCreateBook = (newBook: CreateBookModel) => {
    createBook(newBook).then(() => {
      setIsCreateBookModalOpen(false);
    });
  };

  // Handle deleting a book
  const handleDeleteBook = (id: string) => {
    deleteBook(id).then(() => {
      setIsDeleteBookModalOpen(false);
    });
  };

  if (booksLoading || authorsLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (booksError || authorsError) {
    return (
      <p className="text-center text-red-600">
        Error: {booksError || authorsError}
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <PageTitle title="List of Books" />
      <div className="mb-6 flex gap-4">
        <div className="flex gap-4 flex-1">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
          />
          <SortDropdown
            sortOptions={sortOptions}
            selectedSort={sortBy}
            onSortChange={setSortBy}
          />
          <SortOrderButton
            sortOrder={sortOrder}
            onToggleSortOrder={toggleSortOrder}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <BookTable
          books={books}
          authors={authors}
          onDelete={(id) => {
            setSelectedBookId(id);
            setIsDeleteBookModalOpen(true);
          }}
        />
      </div>
      {/* Move the Create Book button below the table */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsCreateBookModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          Add Book
        </button>
      </div>
      {isCreateBookModalOpen && (
        <CreateBookModal
          isOpen={isCreateBookModalOpen}
          onClose={() => setIsCreateBookModalOpen(false)}
          onSave={handleCreateBook}
          authors={authors}
        />
      )}
      {isDeleteBookModalOpen && (
        <DeleteBookModal
          isOpen={isDeleteBookModalOpen}
          onClose={() => setIsDeleteBookModalOpen(false)}
          onDelete={() => handleDeleteBook(selectedBookId!)}
        />
      )}
    </div>
  );
}
