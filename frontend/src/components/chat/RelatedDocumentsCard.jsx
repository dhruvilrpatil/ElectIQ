/**
 * Displays a list of related official ECI documents retrieved from search results.
 * @param {Object} props
 * @param {Array<Object>} props.documents - Array of document objects with title, link, and snippet.
 */
export default function RelatedDocumentsCard({ documents }) {
  if (!documents || documents.length === 0) return null;

  return (
    <div className="related-docs" aria-label="Related official documents">
      <h4 className="related-docs__title">📄 Official ECI Sources</h4>
      <ul className="related-docs__list">
        {documents.map((doc, i) => (
          <li key={`${doc.link}-${i}`} className="related-docs__item">
            <a href={doc.link} target="_blank" rel="noopener noreferrer" className="related-docs__link">
              <strong>{doc.title}</strong>
              {doc.snippet && <p className="related-docs__snippet">{doc.snippet}</p>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
