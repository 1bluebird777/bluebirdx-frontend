'use client'

import { motion } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-4 max-h-60 overflow-y-auto px-4">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: msg.role === 'assistant' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-md px-6 py-3 rounded-3xl ${
              msg.role === 'assistant'
                ? 'bg-gradient-to-br from-electric-blue to-deep-navy text-white leia-message'
                : 'bg-white/10 border border-electric-blue/30 text-soft-white customer-message'
            }`}
          >
            {msg.role === 'assistant' && <span className="mr-2">👸</span>}
            {msg.content}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
