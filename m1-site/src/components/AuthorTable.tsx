import React from "react";
import { AuthorModel } from "../models/AuthorModel";
import Link from "next/link";

interface AuthorTableProps {
  authors: AuthorModel[];
  onDelete: (id: string) => void;
}

export const AuthorTable: React.FC<AuthorTableProps> = ({
  authors,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Author's Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Number of Books
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Average Rating
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Picture
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {authors.map((author) => (
            <tr
              key={author.id}
              className="hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.005] hover:shadow-sm"
            >
              <td className="px-6 py-4 text-sm text-gray-900">{author.name}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {author.numberOfBooksWritten}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {author?.averageRating === 0
                  ? "NaN"
                  : `${author?.averageRating.toFixed(2)}/5`}
              </td>
              <td className="px-6 py-4">
                <img
                  src={author.photoURL || "/placeholder-author.jpg"}
                  alt={author.name}
                  className="w-12 h-12 object-cover rounded-full shadow-sm"
                />
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <Link href={`/authors/${author.id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
                    Details
                  </button>
                </Link>
                <button
                  onClick={() => onDelete(author.id)}
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
