import Container from "@/components/Container";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import ActiveCategoryProvider from "../context/ActiveCategoryProvider";

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
    <ActiveCategoryProvider>
      <html lang="en">
        <body className={`${inter.className} text-[#555]`}>
          <Header />
          <Container>{children}</Container>
        </body>
      </html>
    </ActiveCategoryProvider>
  );
}
