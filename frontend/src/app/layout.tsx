import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/is.auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Escoffier menu",
  description: "your best menu dishes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="pt-br">
        <body className={inter.className}>

          {children}

        </body>
      </html>
    </AuthProvider>
  );
}
