import "./globals.css";

export const metadata = {
  title: "Adam — Portfolio",
  description:
    "CS + Mechanical Engineering builder — robotic hands, AI agents, and hackathon wins. Ask the AI version of me about any of it.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
