import { REPLIES, type ScriptedReply } from './replies'
import type { BotEvent, ChatMessage } from './types'

const FIRST_TOKEN_DELAY_MS = 1500
const TOKEN_DELAYS_MS = [40, 70, 55, 90, 45, 60]
const CHUNK_SIZES = [3, 1, 5, 2, 4, 6, 2]

/**
 * Mocked AI service. Behaves like a network stream: latency, partial tokens, occasional failures.
 * Aborting `signal` rejects with an AbortError, like `fetch` does.
 */
export async function* streamReply(
  history: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<BotEvent> {
  const reply = pickReply(history)
  await sleep(FIRST_TOKEN_DELAY_MS, signal)
  let sent = 0
  for (const [i, chunk] of chunks(reply.markdown).entries()) {
    if (reply.failAfterChars !== undefined && sent >= reply.failAfterChars) {
      throw new Error('Network error: connection to the assistant was lost')
    }
    yield { type: 'token', text: chunk }
    sent += chunk.length
    await sleep(TOKEN_DELAYS_MS[i % TOKEN_DELAYS_MS.length], signal)
  }
  if (reply.quickReplies.length > 0) yield { type: 'quick_replies', options: reply.quickReplies }
  yield { type: 'done' }
}

function pickReply(history: ChatMessage[]): ScriptedReply {
  const userTurns = history.filter((m) => m.role === 'user').length
  return REPLIES[Math.max(0, userTurns - 1) % REPLIES.length]
}

export function chunks(text: string): string[] {
  const result: string[] = []
  for (let pos = 0, i = 0; pos < text.length; i++) {
    const size = CHUNK_SIZES[i % CHUNK_SIZES.length]
    result.push(text.slice(pos, pos + size))
    pos += size
  }
  return result
}

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(abortError())
    const timer = setTimeout(done, ms)
    signal.addEventListener('abort', onAbort, { once: true })
    function done() {
      signal.removeEventListener('abort', onAbort)
      resolve()
    }
    function onAbort() {
      clearTimeout(timer)
      reject(abortError())
    }
  })
}

function abortError(): DOMException {
  return new DOMException('The request was aborted', 'AbortError')
}
