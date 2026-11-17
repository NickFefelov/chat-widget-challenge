import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { chunks, streamReply } from './chatService'
import { REPLIES } from './replies'
import type { BotEvent, ChatMessage } from './types'

function historyWithUserTurns(count: number): ChatMessage[] {
  return Array.from({ length: count }, (_, i) => ({ id: String(i), role: 'user', text: 'hi' }))
}

async function collect(stream: AsyncGenerator<BotEvent>): Promise<BotEvent[]> {
  const events: BotEvent[] = []
  for await (const event of stream) events.push(event)
  return events
}

function tokensOf(events: BotEvent[]): string {
  return events.map((e) => (e.type === 'token' ? e.text : '')).join('')
}

describe('chunks', () => {
  it('splits text into pieces that join back into the original', () => {
    const text = 'Solar panels for every roof.'
    expect(chunks(text).join('')).toBe(text)
  })
})

describe('streamReply', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('streams the whole reply, then quick replies, then done', async () => {
    const result = collect(streamReply(historyWithUserTurns(1), new AbortController().signal))
    await vi.runAllTimersAsync()
    const events = await result
    expect(tokensOf(events)).toBe(REPLIES[0].markdown)
    expect(events.at(-2)).toEqual({ type: 'quick_replies', options: REPLIES[0].quickReplies })
    expect(events.at(-1)).toEqual({ type: 'done' })
  })

  it('rejects with AbortError when the signal is aborted', async () => {
    const controller = new AbortController()
    const result = collect(streamReply(historyWithUserTurns(1), controller.signal))
    controller.abort()
    await expect(result).rejects.toMatchObject({ name: 'AbortError' })
  })

  it('fails mid-stream on the fourth turn', async () => {
    const result = collect(streamReply(historyWithUserTurns(4), new AbortController().signal))
    const assertion = expect(result).rejects.toThrow('Network error')
    await vi.runAllTimersAsync()
    await assertion
  })
})
