'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TheOrbiverse from '@/components/TheOrbiverse/TheOrbiverse'
import MagicalTextbox from '@/components/Chat/MagicalTextbox'
import ChatMessages from '@/components/Chat/ChatMessages'
import DriverCards from '@/components/DriverCards/DriverCards'
import Image from 'next/image'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Welcome to BluebirdX! I'm Princess Leia, your luxury concierge. I'd be delighted to help you arrange your journey. ✨" }
  ])
  const [drivers, setDrivers] = useState<any[]>([])
  const [orbState, setOrbState] = useState<'idle' | 'listening' | 'thinking' | 'revealing'>('idle')
  const [threadId, setThreadId] = useState<string | null>(null)

  const handleSendMessage = async (message: string) => {
    // Add customer message
    setMessages(prev => [...prev, { role: 'user', content: message }])
    setOrbState('thinking')

    try {
      // Call Leia API
      const response = await fetch('/api/leia/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, threadId })
      })

      const data = await response.json()

      // Update thread ID
      if (data.threadId) setThreadId(data.threadId)

      // Add Leia's response
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])

      // If drivers returned, show them
      if (data.drivers && data.drivers.length > 0) {
        setOrbState('revealing')
        setTimeout(() => {
          setDrivers(data.drivers)
        }, 1000)
      } else {
        setOrbState('idle')
      }

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment." }])
      setOrbState('idle')
    }
  }

  const handleVoiceMode = () => {
    // TODO: Implement voice mode
    alert('Voice mode coming soon!')
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image 
            src="https://pub-b70cb36a6853407fa468c5d6dec16633.r2.dev/211154/dynamic-module-load/GENERATE_IMAGE/response/35aa4357c81bb06b2be49df1a84ce31b"
            alt="BluebirdX Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-2xl font-playfair font-bold text-golden-glow">
            BluebirdX.ai
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 text-soft-white hover:text-golden-glow transition-colors">
            Login
          </button>
          <button className="px-6 py-2 bg-golden-glow text-midnight-blue rounded-full hover:scale-105 transition-transform font-semibold">
            Book Now
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-8">

        {/* Chat History */}
        <motion.div 
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ChatMessages messages={messages} />
        </motion.div>

        {/* The Orbiverse */}
        <div className="w-full max-w-2xl h-[400px] relative">
          <TheOrbiverse state={orbState} drivers={drivers} />
        </div>

        {/* Driver Cards (when available) */}
        <AnimatePresence>
          {drivers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-4xl"
            >
              <DriverCards drivers={drivers} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Magical Textbox */}
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MagicalTextbox 
            onSend={handleSendMessage} 
            onVoiceMode={handleVoiceMode}
          />
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-soft-white/60">
        © 2025 BluebirdX.ai - Luxury Transportation, Powered by AI
      </footer>
    </main>
  )
}
