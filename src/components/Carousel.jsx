import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";

const getRandomSubset = (arr, count) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const DemoCarousel = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((response) => response.json())
      .then((data) => {
        const randomPodcasts = getRandomSubset(data, 5);
        setPodcasts(randomPodcasts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const onChange = (index) => {
    console.log(`Slide changed to: ${index}`);
  };

  const onClickItem = (index, item) => {
    console.log(`Item ${index} clicked:`, item);
  };

  const onClickThumb = (index, item) => {
    console.log(`Thumbnail ${index} clicked:`, item);
  };

  return (
    <div className="custom-carousel">
      <Carousel
        showArrows={true}
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}
      >
        {podcasts.map((podcast, index) => (
          <div key={podcast.id}>
            <img src={podcast.image} alt={`Slide ${index + 1}`} />
            <p className="legend">{podcast.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DemoCarousel;
