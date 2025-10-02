import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gabriel Halmenschlager - Desenvolvedor Back-End | Portfólio",
  description:
    "Portfólio interativo de Gabriel Halmenschlager, desenvolvedor back-end especializado em .NET, C#, PHP, React e tecnologias modernas. Veja meus projetos, habilidades e experiência.",
  keywords: "desenvolvedor, back-end, .NET, C#, PHP, React, SQL, portfolio, web developer",
  authors: [{ name: "Gabriel Halmenschlager" }],
  creator: "Gabriel Halmenschlager",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://gabrielhalm.dev",
    title: "Gabriel Halmenschlager - Desenvolvedor Back-End",
    description: "Portfólio interativo com projetos, habilidades e experiência em desenvolvimento back-end e web",
    siteName: "Gabriel Halmenschlager Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Halmenschlager - Desenvolvedor Back-End",
    description: "Portfólio interativo com projetos, habilidades e experiência em desenvolvimento back-end e web",
    creator: "@gabrielhalm",
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
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/logo1.jpg" />
        <link rel="icon" href="/logo2.png" />
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