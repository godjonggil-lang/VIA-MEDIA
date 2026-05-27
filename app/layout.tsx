import type { Metadata } from 'next'
import './globals.css'
import SiteShell from '@/components/SiteShell'

export const metadata: Metadata = {
  title: 'VIA MEDIA News ??Understand Before You Take a Side',
  description: 'ì§„ë³´?€ ë³´ìˆ˜???œê°??ê±´ì¡°?˜ê²Œ ê¸°ë¡?˜ëŠ” ?…ë¦½ ?¸ë¡ . ?´í•´ê°€ ë¨¼ì?, ?…ì¥?€ ê·??¤ìŒ?…ë‹ˆ??',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        {/* Noto fonts via Google ??swap ensures system fonts show first */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
