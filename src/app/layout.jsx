"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
const inter = Inter({ subsets: ["latin"] });
import Context from "@/context/AuthContext";
import CartProvider from "@/context/CartProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Context>
          <CartProvider>
            <Layout>{children}</Layout>
          </CartProvider>
        </Context>
      </body>
    </html>
  );
}
