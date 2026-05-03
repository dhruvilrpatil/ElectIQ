import { sanitizeHTML } from '../../utils/sanitize.js';
import RelatedDocumentsCard from './RelatedDocumentsCard.jsx';
import VideoCard from '../Video/VideoCard.jsx';

/**
 * Renders an individual chat message, including markdown parsing and related media cards.
 * @param {Object} props
 * @param {Object} props.message - The message object containing role, content, and metadata.
 */
export default function ChatMessage({ message }) {
  const { role, content, timestamp, documents, videos } = message;
  const isUser = role === 'user';

  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  /**
   * Parses basic markdown into HTML for message rendering.
   * @param {string} text 
   * @returns {string} The parsed HTML string.
   */
  function renderMarkdown(text) {
    if (!text) return '';
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      .replace(/\n/g, '<br>');
    html = html.replace(/(<li>.*?<\/li>(?:<br>)?)+/g, (match) => {
      return '<ul>' + match.replace(/<br>/g, '') + '</ul>';
    });
    return html;
  }

  const renderedContent = isUser ? content : renderMarkdown(content);

  return (
    <div className={`chat-message ${isUser ? 'chat-message--user' : 'chat-message--assistant'}`} aria-label={`${role} message at ${formattedTime}`}>
      {!isUser && <div className="chat-message__avatar" aria-hidden="true">🗳️</div>}
      <div className="chat-message__content">
        {isUser ? <p>{content}</p> : <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(renderedContent) }} />}
        {documents && documents.length > 0 && <RelatedDocumentsCard documents={documents} />}
        {videos && videos.length > 0 && <VideoCard videos={videos} />}
      </div>
      <time className="chat-message__time" dateTime={timestamp}>{formattedTime}</time>
    </div>
  );
}
