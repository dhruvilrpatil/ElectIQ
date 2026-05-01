import { LRUCache } from 'lru-cache';
import { LRU_MAX_ENTRIES, CACHE_TTL } from '../config/constants.js';

/**
 * LRU cache instance with a max of 100 entries and a default TTL of 10 minutes.
 * Uses SHA-256 hash of the prompt as the cache key for chat responses.
 */
const cache = new LRUCache({
  max: LRU_MAX_ENTRIES,
  ttl: (CACHE_TTL.CHAT) * 1000, // lru-cache TTL is in milliseconds
  ttlAutopurge: true,
});

let hits = 0;
let misses = 0;

/**
 * Normalizes a cache key by lowercasing and trimming whitespace.
 *
 * @param {string} key - Raw cache key.
 * @returns {string} Normalized key.
 */
function normalizeKey(key) {
  return key.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * LRU cache service for caching API responses.
 */
export const cacheService = {
  /**
   * Retrieves a value from the cache.
   *
   * @param {string} key - Cache key.
   * @returns {*} Cached value or null if not found.
   */
  get(key) {
    const val = cache.get(normalizeKey(key));
    if (val !== undefined) {
      hits++;
      return val;
    }
    misses++;
    return null;
  },

  /**
   * Stores a value in the cache with an optional TTL override.
   *
   * @param {string} key - Cache key.
   * @param {*} value - Value to cache.
   * @param {number} [ttlSeconds] - TTL in seconds (overrides default).
   * @returns {boolean} Whether the item was stored.
   */
  set(key, value, ttlSeconds) {
    const options = ttlSeconds ? { ttl: ttlSeconds * 1000 } : {};
    return cache.set(normalizeKey(key), value, options);
  },

  /**
   * Deletes a value from the cache.
   *
   * @param {string} key - Cache key.
   * @returns {boolean} Whether the item was deleted.
   */
  del(key) {
    return cache.delete(normalizeKey(key));
  },

  /**
   * Flushes all entries from the cache.
   *
   * @returns {void}
   */
  flush() {
    cache.clear();
  },

  /**
   * Returns cache statistics.
   *
   * @returns {{ hits: number, misses: number, keys: number }} Cache stats.
   */
  stats() {
    return { hits, misses, keys: cache.size };
  },
};

export default cacheService;
