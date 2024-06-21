import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({
  title,
  description,
  id,
  genres: genreIds,
  image,
  seasons,
  updated,
}) => {
  console.log({ id }); // Log the id to verify it's being passed correctly
  const [genreTitles, setGenreTitles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreTitles = async () => {
      try {
        const promises = genreIds.map((id) =>
          fetch(`https://podcast-api.netlify.app/genre/${id}`).then(
            (response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch genre ${id}`);
              }
              return response.json();
            }
          )
        );
        const responses = await Promise.all(promises);
        setGenreTitles(responses.map((response) => response.title));
      } catch (error) {
        console.error("Error fetching genres:", error);
        setError("Failed to load genres");
      }
    };

    fetchGenreTitles();
  }, [genreIds]);

  return (
    <div className="card">
      {error && <p className="error-message">{error}</p>}
      <img src={image} className="card--image" alt={title} />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">
          {description.split(" ").slice(0, 50).join(" ")}...
        </p>
        <div className="card-genres">
          {genreTitles.map((genreTitle, index) => (
            <span key={index}>{genreTitle}</span>
          ))}
        </div>
        <p className="card-seasons">
          <strong>Seasons:</strong> {seasons}
        </p>
        <p className="card-updated">
          <strong>Updated:</strong> {new Date(updated).toLocaleDateString()}
        </p>
      </div>
      <Link to={`/podcast/${id}`} className="card-link">
        Read More...
      </Link>
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
  id: PropTypes.number.isRequired,
};

export default Card;
