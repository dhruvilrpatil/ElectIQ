/**
 * Displays a list of related educational YouTube videos.
 * @param {Object} props
 * @param {Array<Object>} props.videos - Array of video objects containing ID, title, and thumbnail.
 */
export default function VideoCard({ videos }) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="video-card" aria-label="Related educational videos">
      <h4 className="video-card__title">🎬 Educational Videos</h4>
      <div className="video-card__grid">
        {videos.map((video) => (
          <a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card__item"
            aria-label={`Watch: ${video.title}`}
          >
            {video.thumbnail && (
              <img src={video.thumbnail} alt={video.title} className="video-card__thumbnail" loading="lazy" />
            )}
            <div className="video-card__info">
              <p className="video-card__name">{video.title}</p>
              <p className="video-card__channel">{video.channelTitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
