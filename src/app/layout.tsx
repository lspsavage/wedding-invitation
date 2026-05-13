import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Great_Vibes, Cinzel } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "The Wedding of Aris & Sarah",
  description: "Official wedding invitation for Aris & Sarah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable} ${cinzel.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
