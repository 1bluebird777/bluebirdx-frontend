import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Initialize OpenAI client here (at runtime) instead of at module level
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const LEIA_ASSISTANT_ID = process.env.LEIA_ASSISTANT_ID!

    const { message, threadId } = await req.json()

    // Create or reuse thread
    let thread
    if (threadId) {
      thread = { id: threadId }
    } else {
      thread = await openai.beta.threads.create()
    }

    // Add user message
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message
    })

    // Run Leia's assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: LEIA_ASSISTANT_ID
    })

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)

    let attempts = 0
    while (runStatus.status !== 'completed' && attempts < 30) {
      if (runStatus.status === 'failed') {
        throw new Error('Assistant run failed')
      }

      // Handle function calls to Yoda here (if needed)
      if (runStatus.status === 'requires_action') {
        // TODO: Call Yoda Edge Function for driver search
        // For now, return mock data if request mentions drivers
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
      attempts++
    }

    if (runStatus.status !== 'completed') {
      throw new Error('Assistant run timeout')
    }

    // Get Leia's response
    const messages = await openai.beta.threads.messages.list(thread.id)
    const leiaMessage = messages.data[0]

    // Extract text content
    let leiaResponse = ''
    for (const content of leiaMessage.content) {
      if (content.type === 'text') {
        leiaResponse += content.text.value
      }
    }

    // Check if we need to return mock drivers for demo
    const needsDrivers = message.toLowerCase().includes('ride') || 
                        message.toLowerCase().includes('driver') ||
                        message.toLowerCase().includes('jfk') ||
                        message.toLowerCase().includes('airport')

    const mockDrivers = needsDrivers ? [
      {
        id: '1',
        name: 'Michael',
        rating: 4.9,
        vehicle: 'Tesla Model S',
        price: 120,
        eta: '10 min',
        photo: '👨‍💼'
      },
      {
        id: '2',
        name: 'Sarah',
        rating: 5.0,
        vehicle: 'Mercedes S-Class',
        price: 150,
        eta: '15 min',
        photo: '👩‍💼'
      },
      {
        id: '3',
        name: 'David',
        rating: 4.8,
        vehicle: 'BMW 7 Series',
        price: 135,
        eta: '12 min',
        photo: '👨'
      }
    ] : []

    return NextResponse.json({
      message: leiaResponse,
      threadId: thread.id,
      drivers: mockDrivers
    })

  } catch (error) {
    console.error('Leia API error:', error)
    return NextResponse.json(
      { error: 'Failed to chat with Princess Leia' }, 
      { status: 500 }
    )
  }
}
