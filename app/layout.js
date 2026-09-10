import "./globals.css";
import { Big_Shoulders_Display, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Adam — Portfolio",
  description:
    "CS + Mechanical Engineering builder — robotic hands, AI agents, and hackathon wins. Ask the AI version of me about any of it.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
