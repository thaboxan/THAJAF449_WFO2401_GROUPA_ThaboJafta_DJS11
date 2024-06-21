import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fuse from "fuse.js";
import Card from "./Card";
import "./Homepage.css";
import { fetchPreview } from "../utils/fetchApi";

export default function Homepage() {
  const { id } = useParams();
  const selectedGenre = id ? parseInt(id) : null;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("title-asc"); // Changed default to "title-asc"
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const previewData = await fetchPreview();
        setData(previewData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByGenre = (items, genreId) => {
    if (!genreId) return items;
    return items.filter((item) => item.genres.includes(genreId));
  };

  const fuzzySearch = (items, query) => {
    if (!query) return items;

    const fuse = new Fuse(items, {
      keys: ["title", "description", "genres"],
      threshold: 0.3,
    });

    return fuse.search(query).map((result) => result.item);
  };

  const sortData = (items, order) => {
    return [...items].sort((a, b) => {
      switch (order) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "recently-updated":
          return new Date(b.updated) - new Date(a.updated);
        case "oldest-updated":
          return new Date(a.updated) - new Date(b.updated);
        default:
          return 0;
      }
    });
  };

  const processData = (data) => {
    let processed = filterByGenre(data, selectedGenre);
    processed = fuzzySearch(processed, searchQuery);
    return sortData(processed, sortOrder);
  };

  const processedData = processData(data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="dropdown">
        <select
          className="select-box"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="recently-updated">Newly Updated</option>
          <option value="oldest-updated">Oldest Updated</option>
        </select>
      </div>

      <div className="text-input">
        <input
          type="text"
          className="input-box"
          placeholder="Search Shows"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <section className="cards-list">
        {processedData.map((podcast) => (
          <Card
            key={podcast.id}
            id={podcast.id}
            title={podcast.title}
            description={podcast.description}
            genres={podcast.genres}
            image={podcast.image}
            seasons={podcast.seasons}
            updated={podcast.updated}
          />
        ))}
      </section>
    </div>
  );
}
