import { useState, useEffect, useCallback } from 'react';
import { fetchYoutubeVideos } from '../services/api.js';

/**
 * Fetches educational YouTube videos for a specified topic.
 * @param {string|null} topic - Topic to search for.
 * @returns {Object} An object containing the videos array, loading state, and quota status.
 */
export function useYoutube(topic) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const fetchVideos = useCallback(async () => {
    if (!topic) return;
    setIsLoading(true);
    try {
      const data = await fetchYoutubeVideos(topic);
      setQuotaExceeded(data.quotaExceeded);
      setVideos(data.results || []);
    } catch {
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, isLoading, quotaExceeded };
}

export default useYoutube;
