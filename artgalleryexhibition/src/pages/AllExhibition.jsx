import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";

// Define the API endpoint URL
const API_URL = "http://localhost:2025/api/v1/exhibition/getAllExhibitions";

const ExhibitionList = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ExhibitionCard = ({ exhibition }) => {
    const imageUrl = `http://localhost:2025/image/getImageById/${exhibition.imageData.id}`;

    return (
      <Card sx={{ maxWidth: 345, height: "100%" }}>
        {/* Display the Image */}
        {exhibition.imageData.name && (
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={exhibition.title}
            sx={{ objectFit: "cover" }}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {exhibition.title}
          </Typography>
          <Typography variant="body2" color="text.thirdary">
            Status: {exhibition.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start Date: {exhibition.start_date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            End Date: {exhibition.end_date}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Exhibitions: " + data);
        setExhibitions(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setExhibitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  // --- Conditional Rendering ---

  if (loading) {
    return <Typography variant="h6">Loading exhibition...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error fetching data: {error}</Typography>;
  }

  if (exhibitions.length === 0) {
    return <Typography variant="h6">No exhibition found.</Typography>;
  }

  // --- Main List Rendering ---

  return (
    <div
      style={{
        padding: "20px",
        alignContent: "center",
        alignItems: "center !important",
      }}
    >
      <h1
        style={{
          alignItems: "center",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Exhibition Collection
      </h1>

      <Grid container spacing={3}>
        {exhibitions.map((exhibition) => (
          <Grid item key={exhibition.id} xs={12} sm={6} md={4} lg={3}>
            <ExhibitionCard exhibition={exhibition} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ExhibitionList;
