'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onSend: (message: string) => void
  onVoiceMode: () => void
}

export default function MagicalTextbox({ onSend, onVoiceMode }: Props) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="magical-textbox relative">
      <motion.div
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Leia Avatar (left) */}
        <motion.div
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-electric-blue to-golden-glow rounded-full flex items-center justify-center text-2xl"
          animate={isFocused ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          👸
        </motion.div>

        {/* Input Field */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask Princess Leia anything..."
          className="magical-textbox-input"
        />

        {/* Voice Button (right) */}
        <motion.button
          type="button"
          onClick={onVoiceMode}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-golden-glow rounded-full flex items-center justify-center text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🎤
        </motion.button>
      </motion.div>
    </form>
  )
}
