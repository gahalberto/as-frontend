import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santa Secret - Amigo Secreto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-350 text-gray-100">{children}</body>
    </html>
  );
}
