import React, { useState } from "react";
import { UpdateBookModel, BookModel } from "../../models/BookModel";
import { Modal, Box, TextField, Button } from "@mui/material";
import { AuthorModel } from "../../models/AuthorModel";

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedBook: UpdateBookModel) => void;
  book: BookModel | null;
  authors: AuthorModel[];
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  book,
  authors,
}) => {
  const [title, setTitle] = useState(book?.title || "");
  const [publishedYear, setPublishedYear] = useState(book?.publishedYear || 0);
  const [price, setPrice] = useState(book?.price || 0);
  const [authorId, setAuthorId] = useState(book?.authorId || ""); // Add authorId state

  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title || !publishedYear || !price || !authorId) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    const updatedBook: UpdateBookModel = {
      title,
      publishedYear,
      price,
      authorId,
    };
    onUpdate(updatedBook);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Book Title
            </label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Published Year
            </label>
            <input
              type="number"
              placeholder="Published Year"
              name="publishedYear"
              required
              value={publishedYear}
              onChange={(e) => setPublishedYear(Number(e.target.value))}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              name="price"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <select
              name="authorId"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default EditBookModal;
