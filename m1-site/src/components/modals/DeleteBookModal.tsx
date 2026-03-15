import React from "react";
import { Modal, Box } from "@mui/material";

interface DeleteBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="mb-4">Are you sure you want to delete the book?</p>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteBookModal;
