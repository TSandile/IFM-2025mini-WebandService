import "../css/Home.css";
import theQueenImage from "../images/images (15).jpg";
import waveImage from "../images/images (1).jpg";
import skyImage from "../images/download (3).jpg";
import { useNavigate } from "react-router-dom";

const featuredArtworks = [
  {
    id: 101,
    title: " The Wave",
    artist: "Bongani M",
    image: waveImage,
  },
  {
    id: 102,
    title: "The Queen",
    artist: "Jay Something",
    image: theQueenImage,
  },
  {
    id: 103,
    title: "The Sky",
    artist: "Jay Something",
    image: skyImage,
  },
];

// --- Component for a Featured Card ---
const FeaturedCard = ({ artwork }) => (
  <div className="featured-card">
    <div className="card-image-placeholder">
      <img src={artwork.image} alt={artwork.title} width={290} height={200} />
    </div>
    <div className="card-info">
      <h4>{artwork.title}</h4>
      <p>by **{artwork.artist}**</p>
      {/* <button className="view-details-btn">View Details</button> */}
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/artPieces");
  };

  return (
    <>
      <div className="gallery-home">
        <section className="hero-section">
          <h1>Welcome To The Joburg Art Gallery Exhibition</h1>
          <p className="subtitle">
            Where talent meets the right candidates. Explore the art
            collections.
          </p>
          <button onClick={() => handleExplore()} className="explore-btn">
            Start Your Exploration
          </button>
        </section>

        <hr />

        <section className="featured-section">
          <h2> Featured Art Pieces</h2>
          <div className="featured-list">
            {featuredArtworks.map((artwork) => (
              <FeaturedCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </section>

        <hr />
      </div>
    </>
  );
};
export default Home;
