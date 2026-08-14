import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import { AuthProvider } from "@/context/AuthContext";
import WishlistToast from "@/components/common/WishlistToast";
import PageInitialLoader from "@/components/common/PageInitialLoader";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://muvi-cinema.vercel.app"),
  title: {
    default: "Muvi Cinema | Watch Movies & TV Shows Online in 4K Ultra HD",
    template: "%s | Muvi Cinema",
  },
  description:
    "Stream the latest movies, Hindi & Bengali web series, Hollywood blockbusters, anime, and TV shows in 4K Ultra HD on Muvi Cinema.",
  keywords: [
    "movies online",
    "watch movies free",
    "free tv series",
    "bengali movies",
    "hindi web series",
    "bollywood blockbusters",
    "hollywood movies in hd",
    "k-drama",
    "anime online",
  ],
  authors: [{ name: "Muvi Cinema Team" }],
  creator: "Muvi Cinema",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muvi-cinema.vercel.app",
    siteName: "Muvi Cinema",
    title: "Muvi Cinema | Watch Movies & TV Shows Online in 4K Ultra HD",
    description:
      "Stream the latest movies, Hindi & Bengali web series, and Hollywood blockbusters in 4K Ultra HD.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muvi Cinema | Watch Movies & TV Shows Online",
    description:
      "Stream the latest movies, Hindi & Bengali web series, and Hollywood blockbusters in 4K Ultra HD.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <PageInitialLoader />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WishlistToast />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
