import "../css/Home.css";

const featuredArtworks = [
  {
    id: 101,
    title: "Abstract Harmony",
    artist: "Anya Zola",
    image: "abstract.jpg",
  },
  {
    id: 102,
    title: "Coastal Serenity",
    artist: "Ben Carter",
    image: "coast.jpg",
  },
  {
    id: 103,
    title: "The Urban Pulse",
    artist: "Chloe Davis",
    image: "urban.jpg",
  },
];

const galleryInfo = {
  address: "123 Museum Way, Art City, 54321",
  hours: "Mon-Sat: 10:00 AM - 6:00 PM",
  phone: "(555) 123-4567",
};

// --- Component for a Featured Card ---
const FeaturedCard = ({ artwork }) => (
  <div className="featured-card">
    <div className="card-image-placeholder">
      {/* Replace this with an actual <img src={artwork.image} /> tag */}
    </div>
    <div className="card-info">
      <h4>{artwork.title}</h4>
      <p>by **{artwork.artist}**</p>
      <button className="view-details-btn">View Details</button>
    </div>
  </div>
);
const Home = () => {
  return (
    <>
      <div className="gallery-home">
        {/* 1. Hero Section */}
        <section className="hero-section">
          <h1>Welcome to The Renaissance Canvas Gallery</h1>
          <p className="subtitle">
            Where history meets contemporary art. Explore our curated
            collections.
          </p>
          <button className="explore-btn">Start Your Exploration</button>
        </section>

        <hr />

        {/* 2. Featured Artworks Section */}
        <section className="featured-section">
          <h2>✨ Featured Artworks of the Month</h2>
          <div className="featured-list">
            {featuredArtworks.map((artwork) => (
              <FeaturedCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </section>

        <hr />

        {/* 3. About & Info Section */}
        <section className="info-section">
          <div className="about-us">
            <h2>Our Mission</h2>
            <p>
              We are dedicated to fostering a love for the arts by showcasing
              diverse talents from around the globe. Join us in celebrating
              creativity and culture.
            </p>
            <a href="/about" className="more-link">
              Read More About Us &rarr;
            </a>
          </div>
          <div className="visit-info">
            <h2>Plan Your Visit</h2>
            <p>📍 **Address:** {galleryInfo.address}</p>
            <p>⏰ **Hours:** {galleryInfo.hours}</p>
            <p>📞 **Contact:** {galleryInfo.phone}</p>
          </div>
        </section>

        {/* 4. Footer Placeholder */}
        <footer className="home-footer">
          © 2025 The Renaissance Canvas Gallery. All rights reserved.
        </footer>
      </div>
    </>
  );
};
export default Home;
