import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/auth.context";
import { PalleteProvider } from "../context/pallete.context";

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
      <PalleteProvider>
      <html lang="pt-br">
        <body className={inter.className}>

          {children}

        </body>
      </html>
      </PalleteProvider>
    </AuthProvider>
  );
}
