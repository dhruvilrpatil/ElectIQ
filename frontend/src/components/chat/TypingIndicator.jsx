/**
 * Renders an animated typing indicator for the chat interface.
 */
export default function TypingIndicator() {
  return (
    <div className="typing-indicator" role="status" aria-label="ElectIQ is typing">
      <div className="typing-indicator__avatar" aria-hidden="true">🗳️</div>
      <div className="typing-indicator__dots">
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__dot" />
      </div>
      <span className="sr-only">ElectIQ is typing a response…</span>
    </div>
  );
}
