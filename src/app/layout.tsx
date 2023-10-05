import Container from "@/components/Container";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CategoriesNav from "@/components/CategoriesNav";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Gluo",
  description: "Descubre lo último en el mundo digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Container className="p-24">{children}</Container>
      </body>
    </html>
  );
}
