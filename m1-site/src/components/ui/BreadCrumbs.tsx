"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthors } from "../../hooks/useAuthors";
import { useBooks } from "../../hooks/useBooks";
import { useEffect, useState } from "react";

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const { fetchAuthorById } = useAuthors();
  const { fetchBookById } = useBooks();

  const [authorName, setAuthorName] = useState<string | null>(null);
  const [bookTitle, setBookTitle] = useState<string | null>(null);

  // Fetch author name or book title based on the route
  useEffect(() => {
    if (paths[0] === "authors" && paths[1]) {
      fetchAuthorById(paths[1]).then((author) => {
        if (author) {
          setAuthorName(author.name);
        }
      });
    } else if (paths[0] === "books" && paths[1]) {
      fetchBookById(paths[1]).then((book) => {
        if (book) {
          setBookTitle(book.title);
        }
      });
    }
  }, [pathname, fetchAuthorById, fetchBookById]);

  // Only render breadcrumbs if the path is not the root
  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="text-sm bg-white shadow-sm py-2">
      <div className="container mx-auto px-6">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
          {paths.map((path, index) => {
            let displayName = path;

            // Replace IDs with names/titles
            if (paths[0] === "authors" && index === 1 && authorName) {
              displayName = authorName;
            } else if (paths[0] === "books" && index === 1 && bookTitle) {
              displayName = bookTitle;
            }

            // Capitalize "Authors" and "Books"
            if (index === 0) {
              displayName =
                displayName.charAt(0).toUpperCase() + displayName.slice(1);
            }

            return (
              <li key={index} className="flex items-center">
                <span className="mx-2">/</span>
                <Link
                  href={`/${paths.slice(0, index + 1).join("/")}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {displayName}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
