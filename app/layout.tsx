import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/ui/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TeamUp - Team Events & Challenges Platform",
  description: "Join teams, create events, challenge others, and build community through shared experiences",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10">{children}</div>
      </body>
    </html>
  )
}



import './globals.css'