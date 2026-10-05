import type { Metadata } from "next";
import { Bungee } from "next/font/google";
import { Rubik } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AiAssistant } from "@/components/AiAssistant";
import { StickyMobileCta } from "@/components/StickyMobileCta";

const display = Bungee({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});
const body = Rubik({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400","500","600","700"],
});

export const metadata: Metadata = {
  title: "StreetEmber",
  description: "Spray the map. Order before the line.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-style="graffiti-street">
      <body className={`${display.variable} ${body.variable} antialiased pb-20 md:pb-0`}>
        <CartProvider slug="streetember-trucks">
          <WishlistProvider slug="streetember-trucks">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <AiAssistant />
            <StickyMobileCta />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
