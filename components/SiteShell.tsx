'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import WaitlistModal from './WaitlistModal'
import { WaitlistProvider } from '@/context/WaitlistContext'

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <WaitlistProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WaitlistModal />
    </WaitlistProvider>
  )
}
