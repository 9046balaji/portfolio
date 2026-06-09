import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = "https://portfolio-sable-tau-b7ysjwnjns.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Konda Balaji Rao | AI/ML & Cloud Engineer",
    template: "%s | Konda Balaji Rao",
  },
  description:
    "Portfolio of Konda Balaji Rao — Building Agentic AI Systems & Healthcare AI Solutions. Creator of HeartGuard AI, Aura Bank, and more.",
  keywords: [
    "Konda Balaji Rao",
    "AI Engineer",
    "Healthcare AI",
    "Agentic AI",
    "Machine Learning",
    "Deep Learning",
    "LangGraph",
    "DevOps",
    "Python",
    "Portfolio",
    "HeartGuard AI",
    "Aura Bank",
  ],
  authors: [{ name: "Konda Balaji Rao", url: siteUrl }],
  creator: "Konda Balaji Rao",
  verification: {
    google: "google18471c02441f3e2b.html",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Konda Balaji Rao — Portfolio",
    title: "Konda Balaji Rao | AI/ML & Cloud Engineer",
    description:
      "Building Agentic AI Systems & Healthcare AI Solutions. Creator of HeartGuard AI, Aura Bank, and more.",
    images: [
      {
        url: "/assets/profile.png",
        width: 1200,
        height: 630,
        alt: "Konda Balaji Rao — AI/ML & Cloud Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Konda Balaji Rao | AI/ML & Cloud Engineer",
    description:
      "Building Agentic AI Systems & Healthcare AI Solutions. Creator of HeartGuard AI, Aura Bank, and more.",
    images: ["/assets/profile.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Konda Balaji Rao",
  url: siteUrl,
  jobTitle: "AI/ML & Cloud Engineer",
  description:
    "AI/ML Engineer building Agentic AI Systems & Healthcare AI Solutions with Cloud & DevOps.",
  sameAs: [
    "https://github.com/9046balaji",
    "https://www.linkedin.com/in/konda-balaji-rao/",
    "https://leetcode.com/u/KBalajiRao/",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Healthcare AI",
    "LangGraph",
    "DevOps",
    "Cloud Architecture",
    "Python",
    "Docker",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
