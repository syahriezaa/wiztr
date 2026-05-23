import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "WIZTR — Import Merch Band Original",
    template: "%s | WIZTR",
  },
  description:
    "WIZTR menghadirkan merchandise resmi dari ratusan band & label rekaman dunia langsung ke Indonesia. 100% original, bukan KW.",
  keywords: ["merch band", "import merch", "band tee", "original merch", "wiztr", "merchandise indonesia"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "WIZTR Merch",
    title: "WIZTR — Import Merch Band Original",
    description: "Merch band import original dari 40+ official store dunia. 100% authentic, langsung ke Indonesia.",
    images: [
      {
        url: "/brand/wiztr-banner.jpg",
        width: 1200,
        height: 630,
        alt: "WIZTR — Import Merch Band Original",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WIZTR — Import Merch Band Original",
    description: "Merch band import original dari 40+ official store dunia. 100% authentic, langsung ke Indonesia.",
    images: ["/brand/wiztr-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${bebasNeue.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
