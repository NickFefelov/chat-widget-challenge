// The host website. Build the chat widget and render it here.
export default function App() {
  return (
    <main className="site">
      <h1>Northwind Solar</h1>
      <p>Solar panels and batteries for homes and small businesses.</p>
      {Array.from({ length: 12 }, (_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante
          venenatis dapibus posuere velit aliquet. Donec ullamcorper nulla non metus auctor
          fringilla.
        </p>
      ))}
    </main>
  )
}
