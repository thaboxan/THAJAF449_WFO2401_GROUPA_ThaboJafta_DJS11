import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({
  title,
  description,
  genres: genreIds,
  image,
  url,
  seasons,
  updated,
}) => {
  const [genreTitles, setGenreTitles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for entire card
  const [genreLoading, setGenreLoading] = useState(true); // Loading state for genres

  useEffect(() => {
    const fetchGenreTitles = async () => {
      setGenreLoading(true); // Set loading state to true before fetching
      try {
        const promises = genreIds.map((id) =>
          fetch(`https://podcast-api.netlify.app/genre/${id}`).then(
            (response) => response.json()
          )
        );
        const responses = await Promise.all(promises);
        setGenreTitles(responses.map((response) => response.title));
      } catch (error) {
        console.error("Error fetching genres:", error);
        setError("Failed to load genres");
      } finally {
        setLoading(false); // Set overall loading state to false after fetching
        setGenreLoading(false); // Set genre loading state to false
      }
    };

    fetchGenreTitles();
  }, [genreIds]);

  return (
    <div className="card">
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && (
        <>
          <img src={image} className="card--image" alt={title} />
          <div className="card-content">
            <h2 className="card-title">{title}</h2>
            <p className="card-description">
              {description.split(" ").slice(0, 50).join(" ")}...
            </p>
            {genreLoading && (
              <p className="loading-message">Loading Genres...</p>
            )}
            {!genreLoading && (
              <div className="card-genres">
                {genreTitles.map((genreTitle, index) => (
                  <span key={index}>{genreTitle}</span>
                ))}
              </div>
            )}
            <p className="card-seasons">
              <strong>Seasons:</strong> {seasons}
            </p>
            <p className="card-updated">
              <strong>Updated:</strong> {new Date(updated).toLocaleDateString()}
            </p>
          </div>
          <a
            href={url}
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more...
          </a>
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.number).isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  seasons: PropTypes.number.isRequired,
  updated: PropTypes.string.isRequired,
};

export default Card;
