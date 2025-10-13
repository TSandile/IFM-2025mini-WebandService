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
        const data = await response.json();
        setExhibition(data);
      } catch (error) {
        console.error("Error fetching Exhibition:", error);
      }
    };
    fetchArtist();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/updateExhibition/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/deleteExhibition/${id}`);
  };

  const handleArtPieceAssigned = (id) => {
    navigate(`/exhibitionArtPiece/${id}`);
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
              <th>ImageData Id</th>

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
                <td>{exhib.imageData.id}</td>

                <td>
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
                  {""}
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      width: "200px",
                      font: "bold",
                    }}
                    variant="outline-secondary"
                    onClick={() => handleArtPieceAssigned(exhib.id)}
                  >
                    Art Piece Assigned
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
export default ManageExhibition;
