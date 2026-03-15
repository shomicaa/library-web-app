"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      {/* Welcome Section */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to the Book Manager
      </h1>
      <p className="text-gray-600 mb-6">
        Manage your library with ease. Explore the following sections:
      </p>

      {/* Links to Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/books"
          className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Books</h2>
          <p className="text-gray-600">
            View and manage all the books in your library.
          </p>
        </Link>
        <Link
          href="/authors"
          className="p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          <h2 className="text-xl font-semibold text-green-700 mb-2">Authors</h2>
          <p className="text-gray-600">
            View and manage all the authors in your library.
          </p>
        </Link>
      </div>

      {/* Team Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Team</h2>
        <ul className="space-y-3">
          <li className="text-gray-700">Vukasin Badzov</li>
          <li className="text-gray-700">Milos Damjanovic</li>
        </ul>
      </div>
    </div>
  );
}
