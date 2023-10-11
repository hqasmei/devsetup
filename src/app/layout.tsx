import "../styles/globals.css";
import { Young_Serif } from "next/font/google";

const youndSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "devsetup | discover & share your setup",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={youndSerif.className}>
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

