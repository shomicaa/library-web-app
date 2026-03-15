"use client";
import React, { useEffect, useState } from "react";
import { useAuthors } from "../../hooks/useAuthors";
import { AuthorTable } from "../../components/AuthorTable";
import { SearchBar } from "../../components/SearchBar";
import CreateAuthorModal from "../../components/modals/CreateAuthorModal";
import DeleteAuthorModal from "../../components/modals/DeleteAuthorModal";
import { PageTitle } from "../../components/PageTitle";
import { CreateAuthorModel } from "../../models/AuthorModel";
import { SortDropdown } from "../../components/SortDropdown";
import { SortOrderButton } from "../../components/SortOrderButton";

export default function ListAuthors() {
  const {
    authors,
    loading: authorsLoading,
    error: authorsError,
    fetchAuthors,
    createAuthor,
    deleteAuthor,
  } = useAuthors();

  const [isCreateAuthorModalOpen, setIsCreateAuthorModalOpen] = useState(false);
  const [isDeleteAuthorModalOpen, setIsDeleteAuthorModalOpen] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  // Sort options for authors
  const sortOptions = [
    { value: "name", label: "Sort by Name" },
    { value: "numberOfBooksWritten", label: "Sort by Number of Books" },
    { value: "averageRating", label: "Sort by Rating" },
  ];

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  // Fetch authors when sortBy or sortOrder changes
  useEffect(() => {
    fetchAuthors(searchQuery, sortBy, sortOrder);
  }, [sortBy, sortOrder]); // Add sortBy and sortOrder as dependencies

  // Handle search (triggered by Enter or Search button)
  const handleSearch = () => {
    fetchAuthors(searchQuery, sortBy, sortOrder);
  };

  // Load authors when the component mounts
  useEffect(() => {
    fetchAuthors(searchQuery, sortBy, sortOrder);
  }, []);

  // Handle creating a new author
  const handleCreateAuthor = (newAuthor: CreateAuthorModel) => {
    createAuthor(newAuthor).then(() => {
      setIsCreateAuthorModalOpen(false);
    });
  };

  // Handle deleting an author
  const handleDeleteAuthor = (id: string) => {
    deleteAuthor(id).then(() => {
      setIsDeleteAuthorModalOpen(false);
    });
  };

  if (authorsLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (authorsError) {
    return <p className="text-center text-red-600">Error: {authorsError}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <PageTitle title="List of Authors" />
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
        <AuthorTable
          authors={authors}
          onDelete={(id) => {
            setSelectedAuthorId(id);
            setIsDeleteAuthorModalOpen(true);
          }}
        />
      </div>
      {/* Move the Create Author button below the table */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsCreateAuthorModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          Add Author
        </button>
      </div>
      {isCreateAuthorModalOpen && (
        <CreateAuthorModal
          isOpen={isCreateAuthorModalOpen}
          onClose={() => setIsCreateAuthorModalOpen(false)}
          onSave={handleCreateAuthor}
        />
      )}
      {isDeleteAuthorModalOpen && (
        <DeleteAuthorModal
          isOpen={isDeleteAuthorModalOpen}
          onClose={() => setIsDeleteAuthorModalOpen(false)}
          onDelete={() => handleDeleteAuthor(selectedAuthorId!)}
        />
      )}
    </div>
  );
}
