import { NotebookPen, User } from "lucide-react";
import "./globals.css";
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Job Portal
            </Link>
            <div className="space-x-4 flex text-center items-center justify-center">
              <Link href="/" className="hover:text-gray-300 font-bold flex items-center rounded-md gap-2 bg-slate-700 p-2">
                <NotebookPen color="white" size={20} />
                Candidate
              </Link>
              <Link href="/admin" className="hover:text-gray-300 font-bold flex items-center rounded-md gap-2 bg-slate-700 p-2">
                <User strokeWidth={3}  color="white" size={20} />
                Admin
              </Link>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}