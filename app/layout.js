import MotionRoot from "@/components/MotionRoot";
import UiProviders from "@/components/UiProviders";
import { Outfit, Oswald } from "next/font/google";
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
  title: "Phil's Pharma — Pure. Potent. Performance.",
  description:
    "Research peptides and lab essentials with straightforward product information, batch documentation on request, and discreet UK dispatch.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${oswald.variable} h-full antialiased`}>
      <body className="site-bg min-h-full font-sans text-fg">
        <MotionRoot />
        <div className="grain" aria-hidden="true" />
        <UiProviders>{children}</UiProviders>
      </body>
    </html>
  );
}
