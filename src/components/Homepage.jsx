import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import { fetchPreview } from "../utils/fetchApi";

export default function Homepage() {
  const { id } = useParams();
  const selectedGenre = id ? parseInt(id) : null;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("unordered"); // State for sorting order
  const [titleFilter, setTitleFilter] = useState(""); // State for title filter

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

  const filterByTitle = (items, title) => {
    if (!title) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );
  };

  const sortData = (items, order) => {
    switch (order) {
      case "title-asc":
        return items.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return items.sort((a, b) => b.title.localeCompare(a.title));
      case "recently-updated":
        return items.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case "oldest-updated":
        return items.sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return items;
    }
  };

  const filteredData = filterByGenre(data, selectedGenre);
  const titleFilteredData = filterByTitle(filteredData, titleFilter);
  const sortedData = sortData(titleFilteredData, sortOrder);

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
          <option value="unordered">Unordered</option>
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
          placeholder="Filter by title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
      </div>

      <section className="cards-list">
        {sortedData.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            genres={item.genres}
            image={item.image}
            url={item.url}
            seasons={item.seasons}
            updated={item.updated}
          />
        ))}
      </section>
    </div>
  );
}
