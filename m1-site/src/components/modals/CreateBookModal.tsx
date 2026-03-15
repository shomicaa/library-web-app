import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { CreateBookModel } from "../../models/BookModel";
import { AuthorModel } from "../../models/AuthorModel";

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: CreateBookModel) => void;
  authors: AuthorModel[];
  defaultAuthorId?: string;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({
  isOpen,
  onClose,
  onSave,
  authors,
  defaultAuthorId,
}) => {
  const [book, setBook] = useState<CreateBookModel>({
    title: "",
    publishedYear: 0,
    price: 0,
    authorId: defaultAuthorId || "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!book.title || !book.publishedYear || !book.price || !book.authorId) {
      setError("Please fill in all required fields.");
      return;
    }
    const publishedYear = Number(book.publishedYear);
    const price = Number(book.price);

    if (isNaN(publishedYear)) {
      setError("Published Year must be a valid number.");
      return;
    }
    if (isNaN(price)) {
      setError("Price must be a valid number.");
      return;
    }
    const payload = {
      ...book,
      publishedYear,
      price,
    };
    setError("");
    onSave(payload);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
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
              value={book.title}
              onChange={handleChange}
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
              value={book.publishedYear}
              onChange={handleChange}
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
              value={book.price}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Conditionally render the author dropdown only if defaultAuthorId is not provided */}
          {!defaultAuthorId && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <select
                name="authorId"
                value={book.authorId}
                onChange={handleChange}
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
          )}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateBookModal;
