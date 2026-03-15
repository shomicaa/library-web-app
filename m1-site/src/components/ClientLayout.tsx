"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Breadcrumbs } from "./ui/BreadCrumbs";

const PUBLIC_PATHS = ["/login", "/register", "/register-admin"];
const ADMIN_ONLY_PATHS = ["/users"];
const USER_ONLY_PATHS = ["/books", "/authors"];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, role, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !token && !PUBLIC_PATHS.includes(pathname)) {
      router.push("/login");
    }
  }, [token, loading, pathname, router]);

  // Redirect to home if already logged in and visiting a public page
  useEffect(() => {
    if (!loading && token && PUBLIC_PATHS.includes(pathname)) {
      router.push(role === "admin" ? "/users" : "/");
    }
  }, [token, role, loading, pathname, router]);

  // Block admin from user-only pages
  useEffect(() => {
    if (!loading && token && role === "admin" && USER_ONLY_PATHS.some((p) => pathname.startsWith(p))) {
      router.push("/users");
    }
  }, [token, role, loading, pathname, router]);

  // Block regular users from admin-only pages
  useEffect(() => {
    if (!loading && token && role === "user" && ADMIN_ONLY_PATHS.some((p) => pathname.startsWith(p))) {
      router.push("/");
    }
  }, [token, role, loading, pathname, router]);

  if (loading) return null;

  if (PUBLIC_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  if (!token) return null;

  return (
    <>
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link
              href={role === "admin" ? "/users" : "/"}
              className="text-2xl font-bold text-blue-600"
            >
              Book Manager
            </Link>
            <ul className="flex space-x-6 items-center">
              {role === "admin" ? (
                <li>
                  <Link
                    href="/users"
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Users
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/books"
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    >
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/authors"
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    >
                      Authors
                    </Link>
                  </li>
                </>
              )}
              <li>
                <span className="text-xs text-gray-400 border border-gray-200 rounded px-2 py-1">
                  {role}
                </span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-800 transition-colors font-medium"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <Breadcrumbs />
      <main className="container mx-auto px-6 py-8 flex-grow">{children}</main>
      <footer className="bg-white shadow mt-8">
        <div className="container mx-auto px-6 py-4 text-center text-gray-600">
          <p>&copy; 2026 Book Manager. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
