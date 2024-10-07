import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import ClientOnly from "./components/ClientOnly";
import StoreInitializer from "./components/StoreInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BJJ Dojo Game",
  description: "Learn and practice BJJ moves",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <AuthProvider>
            <StoreInitializer>
              {children}
            </StoreInitializer>
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  );
}