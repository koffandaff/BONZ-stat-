import Providers from "@/components/Providers"
import { Bebas_Neue, Cinzel_Decorative, Space_Mono, Barlow_Condensed, Bungee_Shade } from "next/font/google"
import Cursor from "@/components/ui/Cursor"
import ScrollToTop from "@/components/ui/ScrollToTop"
import "./globals.css"

const bebasNeue     = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })
const cinzel        = Cinzel_Decorative({ weight: ["400", "700", "900"], subsets: ["latin"], variable: "--font-cinzel" })
const spaceMono     = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" })
const barlow        = Barlow_Condensed({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-barlow" })
const bungeeShade   = Bungee_Shade({ weight: "400", subsets: ["latin"], variable: "--font-bonz" })

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL("https://godsfavourite.in"),
  title: "BONZ | We wear the void",
  description: "BONZ is an underground streetwear brand. Dark culture has a uniform — this is it.",
  keywords: ["BONZ", "streetwear", "dark fashion", "cyber sigilism", "underground label", "clothing brand", "limited drops", "godsfavourite.in"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: {
    title: "BONZ | We wear the void",
    description: "BONZ is an underground streetwear brand. Dark culture has a uniform — this is it.",
    url: "https://godsfavourite.in",
    siteName: "BONZ",
    images: [{ url: "/image.png", width: 1200, height: 630, alt: "BONZ brand image" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BONZ",
    description: "We wear the void. Underground streetwear.",
    images: ["/image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${cinzel.variable} ${spaceMono.variable} ${barlow.variable} ${bungeeShade.variable}`}>
      <head>
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" async></script>
      </head>
      <body className="antialiased">
        <Providers>
          <Cursor />
          <ScrollToTop />
          {children}
        </Providers>
      </body>
    </html>
  )
}
