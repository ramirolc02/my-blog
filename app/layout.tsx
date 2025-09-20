import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { ThemeProvider } from "./providers/ThemeProvider"
import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Ramiro's Blog - Next.js",
  description: "Created by Ramiro Lopez Cento",
  keywords: ["blog", "nextjs", "react", "typescript", "technology"],
  authors: [{ name: "Ramiro Lopez Cento" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-background">
            <Navbar />
            <main>
              {children}
            </main>
            <Analytics />
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
