import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/utils/providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS 14 W/shadcn & TanStack Query",
  description: "TanStack NextJS",
  keywords: [
    "Marcelo Spegiorin",
    "NextJS 14",
    "Marcelo Spegiorin desenvolverdor",
    "desenvolvedor front end",
    "Marcelo Martins Spegiorin Filho",
    "Programador de sites"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        "min-w-screen bg-background antialiased"
      )}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
