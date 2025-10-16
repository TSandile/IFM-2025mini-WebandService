import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Table } from "react-bootstrap";
import "../artist/ArtistManage.css";

const AssignArtPiece = () => {
  const { id } = useParams();
  const [artPiece, setArtPiece] = useState([]);
  const [exhibition, setExhibition] = useState({
    id: "",
    description: "",
    title: "",
    startdate: "",
    enddate: "",
    status: "",
    imageData: null,
    artPieces: [null],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExhibition = async () => {
      try {
        const response = await fetch(
          `http://localhost:2025/api/v1/exhibition/getExhibition/${id}`
        );
        const data = await response.json();

        setExhibition(data);
        console.log(
          "Exhibition with art Pieces " + exhibition.artPieces.length
        );
      } catch (error) {
        console.error("error fetching exhibition", error);
      }
    };
    fetchExhibition();
  }, [id]);

  useEffect(() => {
    const fetchArtPiece = async () => {
      try {
        const response = await fetch(
          "http://localhost:2025/api/v1/artPiece/getAllArtPieces"
        );
        if (response.ok) {
          const data = await response.json();
          setArtPiece(data);
        }
      } catch (error) {
        console.error("Error fetching art pieces", error);
      }
    };
    fetchArtPiece();
  }, []);

  const handleArtPieceAssign = async (exhId, artId) => {
    try {
      const response = await fetch(
        `http://localhost:2025/api/v1/exhibition/assignArtPiece/${exhId}/${artId}`,
        { method: "PUT", headers: { "Content-Type": "application/json" } }
      );
      if (response.ok) {
        alert("Art Pieces assigned successfully");
        navigate("/manageExhibition");
      }
    } catch (error) {
      console.log("error assigning art Piece", error);
    }
  };

  const handleArtPieceRemove = async (exhId, artId) => {
    try {
      const response = await fetch(
        `http://localhost:2025/api/v1/exhibition/removeArtPiece/${exhId}/${artId}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );

      alert("Art Piece removed successfully");
      navigate("/manageExhibition");
    } catch (error) {
      console.log("error assigning art Piece", error);
    }
  };

  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Manage Art Piece Assigned</h1>
        <hr />
        <Table
          striped
          bordered
          hover
          variant="light"
          style={{
            width: "90%",
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
              <th>Exhibition Title</th>
              <th>Number of ArtPiece Assigned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{exhibition.id}</td>
              <td>{exhibition.title}</td>
              <td>{exhibition.artPieces.length}</td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <h3>Art Pieces</h3>
        <Table
          striped
          bordered
          hover
          variant="light"
          style={{
            width: "90%",
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
              <th>Art Piece Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {artPiece.map((art) => (
              <tr key={art.id}>
                <td>{art.id}</td>
                <td>{art.title}</td>
                <td>{art.description}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <Button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        width: "200px",
                        font: "bold",
                      }}
                      variant="outline-secondary"
                      onClick={() =>
                        handleArtPieceAssign(exhibition.id, art.id)
                      }
                    >
                      Assign Art Piece
                    </Button>{" "}
                    <Button
                      style={{ width: "200px", font: "bold" }}
                      variant="outline-danger"
                      onClick={() =>
                        handleArtPieceRemove(exhibition.id, art.id)
                      }
                    >
                      Remove Art Piece
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default AssignArtPiece;
