import MotionRoot from "@/components/MotionRoot";
import UiProviders from "@/components/UiProviders";
import { Outfit, Oswald } from "next/font/google";
import { pageMetadata, SITE_URL } from "@/lib/site";
import "./globals.css";
import "./motion.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    title: "Phil's Pharma — Pure. Potent. Performance.",
    path: "/",
  }),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/images/logo.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/images/logo.jpeg" }],
    shortcut: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05070c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={`${outfit.variable} ${oswald.variable} h-full antialiased`}>
      <body className="site-bg min-h-full font-sans text-fg">
        <MotionRoot />
        <div className="grain" aria-hidden="true" />
        <UiProviders>{children}</UiProviders>
      </body>
    </html>
  );
}
