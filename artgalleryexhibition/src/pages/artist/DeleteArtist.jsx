import { Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import "../artist/ArtistManage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteArtPiece = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    biography: "",
  });
  //   const [pieceImage, setPieceImage] = useState(null);

  const navigate = useNavigate();

  //handler for text input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   const handleArtPieceImage = (e) => {
  //     setPieceImage(e.target.files[0]);
  //   };

  useEffect(() => {
    const fetchArtPiece = async () => {
      try {
        const response = await fetch(
          `http://localhost:2025/api/v1/artists/getArtist/${id}`
        );
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };
    fetchArtPiece();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:2025/api/v1/artPiece/deleteArtPiece/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Art Piece deleted successfully");
        navigate("/manageArtPieces");
      }
    } catch (error) {
      console.error("Error deleting art piece:", error);
      alert("Failed to delete art piece");
    }
  };

  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Delete Art Piece</h1>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label=" Artist Id"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="id"
                value={formData.id}
                read-only={true}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                className="text-field"
                id="outlined-basic"
                label="Artist Name"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="Biography"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          {/* <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="Description"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="name"
                value={formData.artist.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div> */}

          {/* <div className="d-flex justify-content-around">
            <span> Update Art Piece Image</span>
          </div> */}

          {/* <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                varient="outlined"
                type="file"
                name="image_url"
                onChange={handleArtPieceImage}
                InputProps={{ inputProps: { accept: "images/*" } }}
              />
            </Form.Group>
          </div> */}

          <div className="d-flex justify-content-around">
            <Button
              style={{ width: "300px" }}
              type="submit"
              variant="danger"
              color="error"
            >
              Delete Artist
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default DeleteArtPiece;
