import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import AuthProvider from "./auth/Provider";
import DarkModeSwitch from "./DarkModeSwitch";
import "./globals.css";
import NavBar from "./NavBar";
import QueryClientProvider from "./QueryClientProvider";

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
          <SessionProvider>
            <QueryClientProvider>
              <ThemeProvider attribute="class" enableSystem={false}>
                <Theme accentColor="cyan">
                  <NavBar />
                  <Container>
                    <main className="p-10 xl:px-0">{children}</main>
                  </Container>
                  <Theme accentColor="amber">
                    <DarkModeSwitch />
                  </Theme>
                </Theme>
              </ThemeProvider>
            </QueryClientProvider>
          </SessionProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
