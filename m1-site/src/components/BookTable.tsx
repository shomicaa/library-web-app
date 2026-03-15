import React from "react";
import { BookModel } from "../models/BookModel";
import { AuthorModel } from "../models/AuthorModel";
import Link from "next/link";

interface BookTableProps {
  books: BookModel[];
  authors: AuthorModel[];
  onDelete: (id: string) => void;
}

export const BookTable: React.FC<BookTableProps> = ({
  books,
  authors,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Book's Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Author's Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Published Year
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Average Rating
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {books.map((book) => (
            <tr
              key={book.id}
              className="hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.005] hover:shadow-sm"
            >
              <td className="px-6 py-4 text-sm text-gray-900">{book.title}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {authors.find((author) => author.id === book.authorId)?.name ||
                  "Unknown"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {book.publishedYear}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {book?.averageRating === 0
                  ? "NaN"
                  : `${book?.averageRating.toFixed(2)}/5`}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <Link href={`/books/${book.id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
                    Details
                  </button>
                </Link>
                <button
                  onClick={() => onDelete(book.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
