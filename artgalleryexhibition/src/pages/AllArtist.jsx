import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";

// Define the API endpoint URL
const API_URL = "http://localhost:2025/api/v1/artists/getAllArtists";

const AllArtist = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ArtistCard = ({ artist }) => {
    const imageUrl = `http://localhost:2025/image/getImageById/${artist.imageData.id}`;

    return (
      <Card sx={{ maxWidth: 345, height: "100%" }}>
        {artist.imageData.name && (
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            variant="left"
            alt={artist.name}
            sx={{ objectFit: "cover" }}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Artist: {artist.name}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtists(data);
        // console.log("Image id " + artists.imageData.id);
        setError(null);
      } catch (err) {
        setError(err.message);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, []);

  // --- Conditional Rendering ---

  if (loading) {
    return <Typography variant="h6">Loading artist...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error fetching data: {error}</Typography>;
  }

  if (artists.length === 0) {
    return <Typography variant="h6">No artist found.</Typography>;
  }
  // Main list rendering

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          alignItems: "center",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Artists Featured
      </h1>

      <Grid container spacing={3}>
        {artists.map((artist) => (
          <Grid item key={artist.id} xs={12} sm={6} md={4} lg={3}>
            <ArtistCard artist={artist} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllArtist;
