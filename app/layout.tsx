import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CopyProtection } from "@/components/copy-protection"
import { ScrollHover } from "@/components/scroll-hover"
import { DynamicFavicon } from "@/components/dynamic-favicon"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Luiz Cavalcanti - Portfolio",
  description: "QA Engineer | Full Stack Dev | AI Enthusiast | Desenvolvedor multifacetado com experiência em testes de software, desenvolvimento full stack e análise de dados",
  generator: "v0.app",
  icons: {
    icon: './favicon.svg',
    shortcut: './favicon.svg',
    apple: './apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <CopyProtection />
        <ScrollHover />
        <DynamicFavicon />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <Suspense fallback={null}>
            {children}
            {/* <Analytics /> */}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
