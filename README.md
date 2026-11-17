# Live coding: website chat widget

**Time:** 45-minute session: about 30 minutes of coding, then a demo and questions. **Stack:** React (or Preact) + TypeScript.
**Tools:** anything — AI assistants, coding agents, libraries, documentation.

## Task

`src/App.tsx` is a company's website. Add a chat widget that a visitor uses to talk to the
company's AI assistant.

- Open and close the widget. Esc closes it.
- Show the conversation: visitor messages and assistant messages.
- Send a message with the button or the Enter key.
- Stream the assistant's reply as it arrives, with a **Stop generating** button.
- Show the assistant's quick-reply buttons; clicking one sends its text as the visitor's message.
- Scroll to the latest message automatically, without fighting a visitor who scrolled up to read.
- Works at phone width, and with a keyboard or a screen reader.

Assistant replies are **Markdown**.

## The AI service

`src/mock/chatService.ts` exports `streamReply(history, signal)`, a mocked AI service. Treat it
like a real network service you do not own: **do not modify anything in `src/mock/`**.

```ts
import { streamReply } from './mock/chatService'
import type { BotEvent, ChatMessage } from './mock/types'

// src/mock/types.ts
type ChatMessage = { id: string; role: 'user' | 'assistant'; text: string }

type BotEvent =
  | { type: 'token'; text: string }
  | { type: 'quick_replies'; options: string[] }
  | { type: 'done' }

// `history` is the conversation so far, ending with the visitor's message to reply to.
function streamReply(history: ChatMessage[], signal: AbortSignal): AsyncGenerator<BotEvent>
```

## Rules

- Share your screen and keep your AI conversation visible.
- Talk through what you accept, what you reject, and why.
- You may change anything outside `src/mock/` and add any npm packages.
- A new requirement will be added during the session.
- Pixel-perfect design is not required. A working widget beats a pretty one.

## Commands

Requires Node 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # vitest
npm run typecheck
```
