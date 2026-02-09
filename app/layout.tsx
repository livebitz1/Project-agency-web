import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insalink | Innovating Beyond Pixels",
  description: "Transform your ideas into powerful digital products with Insalink. We deliver cutting-edge solutions that drive real results for teams that dare to innovate.",
  icons: {
    icon: [
      { url: "/metadata.png" },
      { url: "/metadata.png", sizes: "32x32", type: "image/png" },
      { url: "/metadata.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/metadata.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Insalink | Innovating Beyond Pixels",
    description: "Transform your ideas into powerful digital products with Insalink.",
    url: "https://insalink.com",
    siteName: "Insalink",
    images: [
      {
        url: "/metadata.png",
        width: 1200,
        height: 630,
        alt: "Insalink Logo - Digital Innovation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insalink | Innovating Beyond Pixels",
    description: "Transform your ideas into powerful digital products with Insalink.",
    images: [
      {
        url: "/metadata.png",
        alt: "Insalink Logo - Digital Innovation",
      },
    ],
  },
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
