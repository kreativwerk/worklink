import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorkLink — Fachkräfte aus dem Westbalkan",
  description:
    "WorkLink verbindet deutsche Unternehmen mit qualifizierten Fachkräften aus dem Westbalkan. Unternehmen stellen Personalanfragen, Bewerber bewerben sich in Minuten.",
  metadataBase: new URL("https://worklink.example"),
  openGraph: {
    title: "WorkLink — Fachkräfte aus dem Westbalkan",
    description:
      "Personalvermittlung neu gedacht. Unternehmen und Bewerber auf einer Plattform.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
