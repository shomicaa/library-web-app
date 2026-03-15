import React, { useState } from "react";
import { Modal, Box } from "@mui/material";

interface CreateAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (author: {
    name: string;
    biography: string;
    photoURL: string;
  }) => void;
}

const CreateAuthorModal: React.FC<CreateAuthorModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [author, setAuthor] = useState({
    name: "",
    biography: "",
    photoURL: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!author.name || !author.biography || !author.photoURL) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    onSave(author);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Add a New Author</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              value={author.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Biography
            </label>
            <textarea
              placeholder="Biography"
              name="biography"
              required
              value={author.biography}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              name="photoURL"
              required
              value={author.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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

export default CreateAuthorModal;
