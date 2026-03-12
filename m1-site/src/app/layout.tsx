import "../styles/globals.css";

export const metadata = {
  title: "Book Manager",
  description: "A modern book and author management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
