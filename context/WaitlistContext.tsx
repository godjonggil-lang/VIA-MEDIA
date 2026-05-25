'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface WaitlistOptions {
  articleSlug?: string
  amount?: number
  type?: 'subscription' | 'donation' | 'recurring'
  plan?: string
}

interface WaitlistContextValue {
  isOpen: boolean
  options: WaitlistOptions
  openModal: (options?: WaitlistOptions) => void
  closeModal: () => void
}

const WaitlistContext = createContext<WaitlistContextValue>({
  isOpen: false,
  options: {},
  openModal: () => {},
  closeModal: () => {},
})

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<WaitlistOptions>({})

  const openModal = (opts?: WaitlistOptions) => {
    setOptions(opts || {})
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setOptions({})
  }

  return (
    <WaitlistContext.Provider value={{ isOpen, options, openModal, closeModal }}>
      {children}
    </WaitlistContext.Provider>
  )
}

export function useWaitlist() {
  return useContext(WaitlistContext)
}
