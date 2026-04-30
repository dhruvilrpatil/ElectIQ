import fetch from 'node-fetch';
import NodeCache from 'node-cache';
import logger from '../middleware/logger.js';

const cache = new NodeCache({ stdTTL: 1800 }); // 30 minutes

const searchOfficialSources = async (query) => {
  if (!query || typeof query !== 'string') {
    throw new Error('Query is required and must be a string');
  }

  const cleanQuery = query.trim();
  if (cleanQuery.length < 3) {
    throw new Error('Query must be at least 3 characters long');
  }
  if (cleanQuery.length > 200) {
      throw new Error('Query must be less than 200 characters');
  }

  const cacheKey = `search_${cleanQuery}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return { ...cachedResult, cached: true };
  }

  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const cseId = process.env.GOOGLE_CSE_ID;

  if (!apiKey || apiKey === 'YOUR_SEARCH_KEY_HERE' || !cseId || cseId === 'YOUR_CSE_ID_HERE') {
      logger.warn('Google Custom Search API key or CSE ID not configured.');
      return { results: [], query: cleanQuery, message: "Search disabled (no API key)" };
  }

  try {
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.append('key', apiKey);
    url.searchParams.append('cx', cseId);
    url.searchParams.append('q', cleanQuery);
    url.searchParams.append('num', '5');
    url.searchParams.append('dateRestrict', 'y1');

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error('Search API rate limit exceeded', { cause: 429 });
        }
        const errorData = await response.text();
        throw new Error(`Search API error: ${response.status} ${errorData}`, { cause: response.status });
    }

    const data = await response.json();
    
    let results = [];
    if (data.items && data.items.length > 0) {
        results = data.items.map(item => ({
            title: item.title,
            snippet: item.snippet,
            link: item.link,
            displayLink: item.displayLink
        }));
    }

    const resultObj = {
        results,
        query: cleanQuery,
        ...(results.length === 0 && { message: "No official sources found" })
    };

    cache.set(cacheKey, resultObj);
    return { ...resultObj, cached: false };

  } catch (error) {
    logger.error('Search service error:', { error: error.message });
    throw error;
  }
};

export default {
  searchOfficialSources,
};
