//import "/css/Home.css";
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageArtPiece = () => {
  const [artPiece, setArtPiece] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtPieces = async () => {
      try {
        const response = await fetch(
          "http://localhost:2025/api/v1/artPiece/getAllArtPieces"
        );
        const data = await response.json();
        setArtPiece(data);
      } catch (error) {
        console.error("Error fetching art pieces:", error);
      }
    };
    fetchArtPieces();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/updateArtPiece/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/deleteArtPiece/${id}`);
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
          Art Piece Management
        </h1>
        <br />

        <Table
          striped
          bordered
          hover
          variant="light"
          style={{ width: "90%", marginLeft: "50px", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>ArtPiece Title</th>
              <th>Description</th>
              <th>Artist Name</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {artPiece.map((piece) => (
              <tr key={piece.id}>
                <td>{piece.id}</td>
                <td>{piece.title}</td>
                <td>{piece.description}</td>
                <td>{piece.artist.name}</td>
                <td>
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      width: "200px",
                      font: "bold",
                    }}
                    variant="outline-secondary"
                    onClick={() => handleUpdate(piece.id)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    style={{ width: "200px", font: "bold" }}
                    variant="outline-danger"
                    onClick={() => handleDelete(piece.id)}
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
export default ManageArtPiece;
