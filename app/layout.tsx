import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AI Marketing Automation SaaS",
  description:
    "Enterprise-grade AI marketing automation platform. Auto-collect news, generate AI summaries, create social media posts, and schedule uploads to Instagram and X.",
  keywords: [
    "AI marketing",
    "automation",
    "SaaS",
    "social media",
    "content generation",
    "SEO",
  ],
  openGraph: {
    title: "AI Marketing Automation SaaS",
    description:
      "Enterprise-grade AI marketing automation platform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing Automation SaaS",
    description:
      "Enterprise-grade AI marketing automation platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
