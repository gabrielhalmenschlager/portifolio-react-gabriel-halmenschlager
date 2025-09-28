import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "João Silva - Desenvolvedor Full Stack | Portfólio",
  description:
    "Portfólio interativo de João Silva, desenvolvedor full stack especializado em React, Next.js e tecnologias modernas. Veja meus projetos, habilidades e experiência.",
  keywords: "desenvolvedor, full stack, react, nextjs, typescript, portfolio, web developer",
  authors: [{ name: "João Silva" }],
  creator: "João Silva",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://joaosilva.dev",
    title: "João Silva - Desenvolvedor Full Stack",
    description: "Portfólio interativo com projetos, habilidades e experiência em desenvolvimento web",
    siteName: "João Silva Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Silva - Desenvolvedor Full Stack",
    description: "Portfólio interativo com projetos, habilidades e experiência em desenvolvimento web",
    creator: "@usuario",
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
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
