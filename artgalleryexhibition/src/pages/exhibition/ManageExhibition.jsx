import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageExhibition = () => {
  const [exhibition, setExhibition] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          "http://localhost:2025/api/v1/exhibition/getAllExhibitions"
        );
        if (response.ok) {
          const data = await response.json();
          setExhibition(data);
        }
      } catch (error) {
        console.error("Error fetching Exhibition:", error);
      }
    };
    fetchArtist();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/updateExhibition/${id}`);
  };

  const handleDelete = async (id) => {
    navigate(`/deleteExhibition/${id}`);
  };

  const handleArtPieceAssigned = (id) => {
    navigate(`/exhibitionArtPiece/${id}`);
  };

  const handleAssignArtPiece = (id) => {
    navigate(`/assignArtPiece/${id}`);
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
          Exhibition Management
        </h1>
        <br />

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
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Assined Art Pieces</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exhibition.map((exhib) => (
              <tr key={exhib.id}>
                <td>{exhib.id}</td>
                <td>{exhib.title}</td>
                <td>{exhib.description}</td>
                <td>{exhib.start_date}</td>
                <td>{exhib.end_date}</td>
                <td>{exhib.status}</td>
                <td>{exhib.artPieces.length}</td>

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
                      onClick={() => handleUpdate(exhib.id)}
                    >
                      Update
                    </Button>{" "}
                    <Button
                      style={{ width: "200px", font: "bold" }}
                      variant="outline-danger"
                      onClick={() => handleDelete(exhib.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="d-flex justify-content-around">
                    <Button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        width: "200px",
                        font: "bold",
                      }}
                      variant="outline-secondary"
                      onClick={() => handleAssignArtPiece(exhib.id)}
                    >
                      Assigned Art Piece
                    </Button>
                    <Button
                      style={{ width: "200px", font: "bold" }}
                      variant="outline-danger"
                      onClick={() => handleArtPieceAssigned(exhib.id)}
                    >
                      Remove Art Piece
                    </Button>
                  </div>

                  {""}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default ManageExhibition;
