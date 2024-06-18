import "./Homepage.css";
const categories = [
  {
    to: "categories/furnitures",
    imgSrc:
      "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "img1",
    description: "Live Comfortably",
    className: "grid-one",
  },
  {
    to: "categories/skin-care",
    imgSrc:
      "https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "img2",
    description: "Skincare",
    className: "grid-two",
  },
  {
    to: "categories/kitchen",
    imgSrc:
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "img3",
    description: "Kitchen",
    className: "grid-four",
  },
  {
    to: "categories/electronics",
    imgSrc:
      "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "img4",
    description: "Electronics",
    className: "grid-four-low",
  },
];

export default function Homepage() {
  return (
    <div className="home-container">
      <div className="container">
        <div className="grid-container">
          {categories.map((category, index) => (
            <div key={index} className={`featured ${category.className}`}>
              <a href={category.to}>
                <div id={`img${index + 1}`} className="lil-overlay"></div>
                <img src={category.imgSrc} alt={category.alt} />
                <p className="main-description">{category.description}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
