import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./providers/SmoothScroll";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Eli Quinn — Architecture",
  description:
    "Eli Quinn is an architecture student at Dalhousie, based in St. John's, Newfoundland, with an abstract, artistic approach to modern architecture. Selected works, studio, and contact.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
