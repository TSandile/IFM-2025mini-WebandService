import { Form } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import "../artist/ArtistManage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateArtPiece = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    image_url: null,
    artist: {
      name: "",
    },
  });
  const [pieceImage, setPieceImage] = useState(null);

  const navigate = useNavigate();

  //handler for text input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArtPieceImage = (e) => {
    setPieceImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchArtPiece = async () => {
      try {
        const response = await fetch(
          `http://localhost:2025/api/v1/artPiece/getArtPiece/${id}`
        );
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching art piece:", error);
      }
    };
    fetchArtPiece();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.image_url = pieceImage;
    console.log("form data submitted:", formData);
    try {
      const response = fetch(
        `http://localhost:2025/api/v1/artPiece/updateArtPiece/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = (await response).json();
      console.log("updated art Piece:", data);
      navigate("/manageArtPieces");
    } catch (error) {
      console.log("error updating art Piece: ", error.message);
    }
    alert(" Artist form data submitted");
  };

  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Update Art Piece</h1>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label=" Art Piece Id"
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
                label="Art Piece Title"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="Description"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
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
          </div>

          <div className="d-flex justify-content-around">
            <span> Update Art Piece Image</span>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                varient="outlined"
                type="file"
                name="image_url"
                onChange={handleArtPieceImage}
                InputProps={{ inputProps: { accept: "images/*" } }}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Button
              type="submit"
              id="btn-confirm"
              variant="contained"
              size="large"
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateArtPiece;
