import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Due — Assignment Planner",
  description: "Your college assignments in a list and day, week, and month calendars.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
