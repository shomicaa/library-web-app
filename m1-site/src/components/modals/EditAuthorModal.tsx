import React, { useState } from "react";
import { UpdateAuthorModel, AuthorModel } from "../../models/AuthorModel";
import { Modal, Box, TextField, Button } from "@mui/material";

interface EditAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedAuthor: UpdateAuthorModel) => void;
  author: AuthorModel | null;
}

const EditAuthorModal: React.FC<EditAuthorModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  author,
}) => {
  const [name, setName] = useState(author?.name || "");
  const [biography, setBiography] = useState(author?.biography || "");
  const [photoURL, setPhotoURL] = useState(author?.photoURL || "");

  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !biography || !photoURL) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    const updatedAuthor: UpdateAuthorModel = {
      name,
      biography,
      photoURL,
    };
    onUpdate(updatedAuthor);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Edit Author</h2>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
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
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
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

export default EditAuthorModal;
