export type ScriptedReply = {
  markdown: string
  quickReplies: string[]
  failAfterChars?: number
}

export const REPLIES: ScriptedReply[] = [
  {
    markdown:
      'Hi! I can help you find the right solar setup for your home or business. ' +
      'Most customers start by checking prices or booking a short call with an expert.',
    quickReplies: ['See pricing', 'Book a demo', 'Talk to sales'],
  },
  {
    markdown: [
      'Here is a quick overview of our **packages**:',
      '',
      '- **Starter**: 6 panels, from €4 900',
      '- **Home**: 12 panels + battery, from €11 400',
      '- **Business**: custom design',
      '',
      '<img src="x" onerror="alert(\'Hello from the bot reply\')">',
      '',
      'Full details are on the [pricing page](https://example.com/pricing).',
    ].join('\n'),
    quickReplies: ['Book a demo', 'Compare packages'],
  },
  {
    markdown: [
      'Good question. Here is how a typical installation goes:',
      '',
      '1. **Site survey.** An engineer checks your roof angle, shading and electrical panel. This takes about an hour.',
      '2. **Design.** We send a layout with the expected yearly production and payback time.',
      '3. **Permits.** We handle the paperwork with your municipality and grid operator.',
      '4. **Installation.** Mounting and wiring usually take one or two days.',
      '5. **Grid connection.** The operator approves the system and installs a new meter.',
      '6. **Monitoring.** You get an app that shows production, consumption and battery level in real time.',
      '',
      'From the first call to producing your own electricity, most projects take six to ten weeks. ' +
        'Winter installations are possible, but surveys may be rescheduled because of snow.',
      '',
      'Would you like to book the site survey?',
    ].join('\n'),
    quickReplies: ['Yes, book a survey', 'Not yet'],
  },
  {
    markdown:
      'Let me check availability for your area. Our engineers usually have free slots ' +
      'within the next two weeks, and the survey itself is free of charge.',
    quickReplies: [],
    failAfterChars: 60,
  },
]
