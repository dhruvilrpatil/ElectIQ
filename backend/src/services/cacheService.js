import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: Number(process.env.CACHE_TTL) || 3600, checkperiod: 120 });

let hits = 0, misses = 0;

function normalizeKey(key) {
  return key.toLowerCase().trim().replace(/\s+/g, ' ');
}

export const cacheService = {
  get(key) {
    const val = cache.get(normalizeKey(key));
    if (val !== undefined) { hits++; return val; }
    misses++;
    return null;
  },
  set(key, value, ttl) {
    if (ttl) return cache.set(normalizeKey(key), value, ttl);
    return cache.set(normalizeKey(key), value);
  },
  del(key) { return cache.del(normalizeKey(key)); },
  flush() { cache.flushAll(); },
  stats() { return { hits, misses, keys: cache.keys().length }; },
};

export default cacheService;
