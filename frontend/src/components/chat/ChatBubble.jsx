import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useChatStore from '@/store/chatStore';
import apiService from '@/services/api';
import { trackEvent } from '@/hooks/useAnalytics';
import styles from './ChatBubble.module.css';

/**
 * Intents that trigger the "Search Official Sources" section.
 */
const SEARCHABLE_INTENTS = [
  'voter_registration',
  'evm',
  'nota',
  'polling_booth',
  'id_documents',
  'election_schedule',
  'results',
  'mcc',
  'cvigil',
  'ai', // Gemini responses
  'ai_response',
];

/**
 * Typewriter hook — reveals text character-by-character like Gemini.
 */
function useTypewriter(text, speed = 12, enabled = true) {
  const [displayed, setDisplayed] = useState(enabled ? '' : text);
  const [isDone, setIsDone] = useState(!enabled);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!enabled || !text) {
      const timer = setTimeout(() => {
        setDisplayed(text || '');
        setIsDone(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    setTimeout(() => {
      setDisplayed('');
      setIsDone(false);
    }, 0);
    let i = 0;

    intervalRef.current = setInterval(() => {
      i += 1;
      // Reveal in chunks of 2-4 chars for natural feel
      const chunk = Math.min(i, text.length);
      setDisplayed(text.slice(0, chunk));
      if (chunk >= text.length) {
        clearInterval(intervalRef.current);
        setIsDone(true);
      }
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [text, speed, enabled]);

  const skip = useCallback(() => {
    clearInterval(intervalRef.current);
    setDisplayed(text || '');
    setIsDone(true);
  }, [text]);

  return { displayed, isDone, skip };
}

function ActionButton({ action }) {
  const handleClick = useCallback(() => {
    try {
      const url = new URL(action.url);
      trackEvent('official_source_clicked', {
        source_domain: url.hostname,
        intent_context: 'action_button',
      });
    } catch { /* not a valid URL */ }
  }, [action.url]);

  if (action.url) {
    return (
      <a href={action.url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} onClick={handleClick}>
        {action.label}
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" width="12" height="12">
          <path d="M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9" /><path d="M13 3h-4m4 0v4m0-4L7 9" />
        </svg>
      </a>
    );
  }
  return <button className={styles.actionBtn} type="button">{action.label}</button>;
}

/**
 * Shimmer skeleton for search results loading state.
 */
function SearchSkeleton() {
  return (
    <div className={styles.searchResults}>
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.searchResultCard}>
          <div className={styles.shimmer} style={{ width: '60%', height: 14, borderRadius: 4 }} />
          <div className={styles.shimmer} style={{ width: '90%', height: 12, borderRadius: 4, marginTop: 6 }} />
          <div className={styles.shimmer} style={{ width: '40%', height: 10, borderRadius: 4, marginTop: 4 }} />
        </div>
      ))}
    </div>
  );
}

/**
 * Official search results section — expandable, fetches from Google Custom Search API.
 */
function OfficialSearchSection({ message }) {
  const [expanded, setExpanded] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchQuery = message.headline || message.content?.slice(0, 80) || '';

  const handleExpand = useCallback(async () => {
    if (expanded) {
      setExpanded(false);
      return;
    }
    setExpanded(true);

    if (results) return; // Already fetched

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.searchSources(searchQuery);
      setResults(data.results || []);
    } catch {
      setError('Unable to search official sources right now.');
    } finally {
      setLoading(false);
    }
  }, [expanded, results, searchQuery]);

  return (
    <div className={styles.searchSection}>
      <button className={styles.searchToggle} onClick={handleExpand} aria-expanded={expanded}>
        <span>🔍 Search Official Sources</span>
        <svg className={`${styles.searchChevron} ${expanded ? styles.searchChevronOpen : ''}`}
          viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            {loading && <SearchSkeleton />}
            {error && <div className={styles.searchEmpty}>{error}</div>}
            {results && results.length === 0 && (
              <div className={styles.searchEmpty}>
                No official results found. Visit <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">eci.gov.in</a> directly.
              </div>
            )}
            {results && results.length > 0 && (
              <div className={styles.searchResults}>
                {results.slice(0, 5).map((item, i) => {
                  const faviconUrl = `https://www.google.com/s2/favicons?domain=${item.displayLink}&sz=16`;
                  return (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.searchResultCard}
                      onClick={() => {
                        trackEvent('official_source_clicked', {
                          source_domain: item.displayLink,
                          intent_context: message.intent || 'search',
                        });
                      }}
                    >
                      <div className={styles.searchResultHeader}>
                        <img src={faviconUrl} alt="" width="16" height="16" className={styles.favicon} />
                        <span className={styles.searchResultTitle}>
                          {item.title.length > 60 ? item.title.slice(0, 60) + '…' : item.title}
                        </span>
                      </div>
                      <p className={styles.searchResultSnippet}>
                        {item.snippet.length > 120 ? item.snippet.slice(0, 120) + '…' : item.snippet}
                      </p>
                      <span className={styles.searchResultDomain}>{item.displayLink}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Translation badge — shows translated content when language is changed.
 */
function TranslatedBadge({ message }) {
  const { selectedLanguage } = useChatStore();
  const [translated, setTranslated] = useState(null);
  const [translating, setTranslating] = useState(false);

  const shouldTranslate = selectedLanguage !== 'en' && message.role === 'assistant';

  const handleTranslate = useCallback(async () => {
    if (translated || translating) return;

    const textToTranslate = message.content || message.headline || '';
    if (!textToTranslate.trim()) return;

    setTranslating(true);
    try {
      const result = await apiService.translateText(textToTranslate.slice(0, 2000), selectedLanguage);
      setTranslated(result.translatedText);
    } catch {
      setTranslated(null);
    } finally {
      setTranslating(false);
    }
  }, [message.content, message.headline, selectedLanguage, translated, translating]);

  // Auto-trigger translation when language changes
  useEffect(() => {
    if (shouldTranslate && !translated && !translating) {
      const timer = setTimeout(handleTranslate, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedLanguage, shouldTranslate, translated, translating, handleTranslate]);

  if (!shouldTranslate) return null;

  return (
    <div className={styles.translationArea}>
      {translating && (
        <div className={styles.translatingBadge}>
          <span className={styles.translatingSpinner} />
          Translating...
        </div>
      )}
      {translated && (
        <div className={styles.translatedContent}>
          <span className={styles.translatedBadge}>🌐 Translated</span>
          <p className={styles.translatedText}>{translated}</p>
        </div>
      )}
    </div>
  );
}

function ChatBubble({ message, onFollowUpClick }) {
  const isUser = message.role === 'user';
  const isStructured = !isUser && (message.headline || (message.steps && message.steps.length > 0));
  
  // Use a state for shouldAnimate to avoid impurity in render
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    if (!isUser && Date.now() - new Date(message.timestamp).getTime() < 2000) {
      setTimeout(() => setShouldAnimate(true), 0);
    }
  }, [isUser, message.timestamp]);

  const [fetchedVideos, setFetchedVideos] = useState(message.videos || null);

  useEffect(() => {
    if (isStructured && !fetchedVideos && message.headline) {
      apiService.getYoutubeVideos(message.headline)
        .then(data => {
          if (data && data.length > 0) {
            setFetchedVideos(data);
          }
        })
        .catch(() => {});
    }
  }, [isStructured, message.headline, fetchedVideos]);

  // Typewriter effect — only for NEW assistant messages
  const { displayed: animatedBody, isDone, skip } = useTypewriter(
    message.content || '',
    10,
    shouldAnimate
  );

  // Check if message intent should show search section
  const showSearch = !isUser && (
    SEARCHABLE_INTENTS.includes(message.intent) || message.headline
  );

  return (
    <motion.div
      className={`${styles.wrapper} ${isUser ? styles.userWrapper : styles.assistantWrapper}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
    >
      {!isUser && (
        <div className={styles.avatar} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M12 8V4H8" />
            <rect x="4" y="8" width="16" height="12" rx="2" ry="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </div>
      )}

      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.assistantBubble}`}>
        {isStructured ? (
          <>
            {message.headline && <div className={styles.headline}>{message.headline}</div>}

            {/* Animated body text with cursor */}
            <div className={styles.body} onClick={!isDone ? skip : undefined} style={!isDone ? { cursor: 'pointer' } : undefined}>
              {animatedBody}
              {!isDone && <span className={styles.cursor}>▊</span>}
            </div>

            {/* Steps — reveal after typewriter finishes */}
            {isDone && message.steps && message.steps.length > 0 && (
              <motion.ol
                className={styles.steps}
                initial={shouldAnimate ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {message.steps.map((step, i) => (
                  <li key={i} className={styles.step}>
                    <span className={styles.stepNum}>{i + 1}</span>
                    <span>{typeof step === 'string' ? step : String(step)}</span>
                  </li>
                ))}
              </motion.ol>
            )}

            {/* Actions — reveal after typewriter */}
            {isDone && message.actions && message.actions.length > 0 && (
              <motion.div
                className={styles.actions}
                initial={shouldAnimate ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {message.actions.map((action, i) => (
                  <ActionButton key={i} action={action} />
                ))}
              </motion.div>
            )}

            {/* Videos */}
            {isDone && fetchedVideos && fetchedVideos.length > 0 && (
              <div className={styles.videos}>
                <span className={styles.videosLabel}>Recommended Videos:</span>
                <div className={styles.videoGrid}>
                  {fetchedVideos.map((vid, i) => (
                    <div key={i} className={styles.videoWrapper}>
                      <iframe
                        className={styles.videoFrame}
                        src={vid.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
                        title={vid.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin">
                      </iframe>
                      <span className={styles.videoTitle}>{vid.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Search Sources — expandable */}
            {isDone && showSearch && <OfficialSearchSection message={message} />}

            {/* Translation Badge */}
            {isDone && <TranslatedBadge message={message} />}

            {/* Follow-up chips — CLICKABLE, reveal after animation */}
            {isDone && message.followUps && message.followUps.length > 0 && (
              <motion.div
                className={styles.followUps}
                initial={shouldAnimate ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <span className={styles.followUpsLabel}>Follow-up questions:</span>
                <div className={styles.followUpsChips}>
                  {message.followUps.map((q, i) => (
                    <button
                      key={i}
                      className={styles.followUpChip}
                      onClick={() => onFollowUpClick && onFollowUpClick(typeof q === 'string' ? q : String(q))}
                      type="button"
                    >
                      {typeof q === 'string' ? q : String(q)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <p className={styles.text}>{isUser ? message.content : animatedBody}{!isUser && !isDone && <span className={styles.cursor}>▊</span>}</p>
        )}

        <time className={styles.timestamp} dateTime={message.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    </motion.div>
  );
}

export default ChatBubble;
