import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"

import "./globals.css"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ramiro`s Blog - Next.js",
  description: "Created by Ramiro Lopez Cento",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="max-w-full mx-auto">
              <div className="px-4 md:px-6 max-w-4xl mx-auto prose prose-xl prose-slate dark:prose-invert">
                {children}
                <Analytics />
                <SpeedInsights />
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
