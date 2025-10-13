import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";

// Define the API endpoint URL
const API_URL = "http://localhost:2025/api/v1/artPiece/getAllArtPieces";

const ArtpieceList = () => {
  const [artpieces, setArtpieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ArtpieceCard = ({ piece }) => {
    const imageUrl = `http://localhost:2025/image/getImageById/${piece.imageData.id}`;

    return (
      <Card sx={{ maxWidth: 345, height: "100%" }}>
        {/* Display the Image */}
        {piece.imageData.name && (
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={piece.title}
            sx={{ objectFit: "cover" }}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {piece.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Artist: {piece.artist.name}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  useEffect(() => {
    const fetchArtpieces = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtpieces(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setArtpieces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtpieces();
  }, []);

  // --- Conditional Rendering ---

  if (loading) {
    return <Typography variant="h6">Loading art pieces...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error fetching data: {error}</Typography>;
  }

  if (artpieces.length === 0) {
    return <Typography variant="h6">No art pieces found.</Typography>;
  }

  // --- Main List Rendering ---

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          alignItems: "center",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Art Piece Collection
      </h1>

      <Grid container spacing={3}>
        {artpieces.map((piece) => (
          <Grid item key={piece.id} xs={12} sm={6} md={4} lg={3}>
            <ArtpieceCard piece={piece} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ArtpieceList;
