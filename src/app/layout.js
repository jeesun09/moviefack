import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import { AuthProvider } from "@/context/AuthContext";
import WishlistToast from "@/components/common/WishlistToast";
import PageInitialLoader from "@/components/common/PageInitialLoader";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Muvi | Watch Movies & TV Shows Online",
  description:
    "Stream the latest movies and TV shows in HD with Muvi. Discover trending action, comedy, drama, horror, anime, and more—all in one premium entertainment destination.",
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
      </body>
    </html>
  );
}
