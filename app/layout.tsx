
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Head from "./components/head/Head";
import NavbarWrapper from "./components/navbarWrapper/NavbarWrapper";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Nossa.Rede",
  description: "AnderPlus - Rede Social Privada",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="pt">
      <Head />
      <body className={`${notoSans.variable} antialiased flex flex-col min-h-screen`}>
        <main className="flex-1">{children}</main>
        <NavbarWrapper />
      </body>
    </html>
  );
}
