import { Theme, ThemePanel } from "@radix-ui/themes";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import "./globals.css";
import AuthProvider from "./auth/Provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "An issue tracker for your projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class">
            <Theme accentColor="cyan">
              <NavBar />
              <main className="p-10">{children}</main>
            </Theme>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
