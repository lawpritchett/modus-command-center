import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MODUS Command Center",
  description: "Executive Operating System for Lawrence Pritchett — MODUS Real Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
