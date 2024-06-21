import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowDetails.css";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch show details");
        }
        const data = await response.json();
        console.log("Fetched show data:", data);
        setShow(data);
        if (data.seasons && data.seasons.length > 0) {
          setSelectedSeason(data.seasons[0].id);
          console.log("Initial selected season:", data.seasons[0].id);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching show details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  useEffect(() => {
    if (show && selectedSeason) {
      const season = show.seasons.find((s) => s.id === selectedSeason);
      console.log("Current selected season data:", season);
    }
  }, [show, selectedSeason]);

  const handleSeasonChange = (event) => {
    const seasonId = parseInt(event.target.value, 10);
    setSelectedSeason(seasonId);
    console.log("Selected season changed to:", seasonId);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!show) return <div>No show details available.</div>;

  const selectedSeasonData = show.seasons.find(
    (season) => season.id === selectedSeason
  );

  console.log("Rendering with selected season:", selectedSeason);
  console.log("Selected season data:", selectedSeasonData);

  return (
    <div className="show-details-container">
      <h2 className="show-title">{show.title}</h2>
      <img src={show.image} alt={show.title} className="show-image" />
      <p className="show-description">{show.description}</p>
      <h3 className="seasons-heading">Seasons</h3>
      <select
        className="season-select"
        value={selectedSeason || ""}
        onChange={handleSeasonChange}
      >
        <option value="" disabled>
          Select a season
        </option>
        {show.seasons.map((season) => (
          <option key={season.id} value={season.id}>
            {season.title}
          </option>
        ))}
      </select>
      <div className="season-info">
        {selectedSeasonData && (
          <p className="total-episodes">
            Total Episodes: {selectedSeasonData.episodes.length}
          </p>
        )}
      </div>
      <div className="episodes-container">
        <h4>Episodes</h4>
        {selectedSeasonData && selectedSeasonData.episodes ? (
          selectedSeasonData.episodes.length > 0 ? (
            selectedSeasonData.episodes.map((episode) => (
              <div key={episode.id} className="episode">
                <h5>{episode.title}</h5>
                <audio controls>
                  <source src={episode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))
          ) : (
            <p>No episodes available for this season.</p>
          )
        ) : (
          <p>Please select a season to view episodes.</p>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;
