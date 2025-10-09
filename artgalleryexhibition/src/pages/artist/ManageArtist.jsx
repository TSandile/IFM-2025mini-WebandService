import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageArtist = () => {
  const [artist, setArtist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          "http://localhost:2025/api/v1/artists/getAllArtists"
        );
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };
    fetchArtist();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/updateArtist/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/deleteArtist/${id}`);
  };

  return (
    <>
      <div className="dash-body" style={{ width: "100%" }}>
        <h1
          className="header"
          style={{
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Artist Management
        </h1>
        <br />

        <Table
          striped
          bordered
          hover
          variant="light"
          style={{
            width: "70%",
            margin: "0 auto",
            marginTop: "20px",
            alignItems: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Artist Name</th>
              <th>Biography</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {artist.map((artist) => (
              <tr key={artist.id}>
                <td>{artist.id}</td>
                <td>{artist.name}</td>
                <td>{artist.biography}</td>

                <td>
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      width: "200px",
                      font: "bold",
                    }}
                    variant="outline-secondary"
                    onClick={() => handleUpdate(artist.id)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    style={{ width: "200px", font: "bold" }}
                    variant="outline-danger"
                    onClick={() => handleDelete(artist.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default ManageArtist;
