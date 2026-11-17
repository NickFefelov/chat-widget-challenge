export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: ChatRole
  text: string
}

export type BotEvent =
  | { type: 'token'; text: string }
  | { type: 'quick_replies'; options: string[] }
  | { type: 'done' }
