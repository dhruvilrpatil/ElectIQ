import { LRUCache } from 'lru-cache';
import { CACHE_MAX_ENTRIES } from '../config/constants.js';

/**
 * Shared LRU cache instance.
 * Max 100 entries. TTL is passed per-entry (chat vs YouTube have different TTLs).
 */
const cache = new LRUCache({
  max: CACHE_MAX_ENTRIES,
  allowStale: false,
});

/**
 * Retrieves a value from the LRU cache.

 * @param {string} key
 * @returns {*|undefined}
 */
export function get(key) {
  return cache.get(key);
}

/**
 * Stores a value in the LRU cache with a specific time-to-live.

 * @param {string} key
 * @param {*} value
 * @param {number} ttl - Time-to-live in milliseconds.
 */
export function set(key, value, ttl) {
  cache.set(key, value, { ttl });
}

/**
 * Checks whether a specific key exists in the LRU cache.

 * @param {string} key
 * @returns {boolean}
 */
export function has(key) {
  return cache.has(key);
}

/**
 * Removes a specific key from the LRU cache.

 * @param {string} key
 */
export function del(key) {
  cache.delete(key);
}

export default { get, set, has, del };
