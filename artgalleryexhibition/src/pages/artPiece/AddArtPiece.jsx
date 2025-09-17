import { Form } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import "../artPiece/AddArtPiece.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddArtPiece = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    artist: "",
    image: null,
  });

  //handler text input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handler for file input
  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0], //store file object itself
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form data submitted:", formData);
    alert(" Artist form data submitted");
  };

  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Add Art Piece</h1>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                className="text-field"
                id="outlined-basic"
                label="Art Piece Title"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic input
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
                //for dynamic input
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
                label="Artist"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic input
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <span> Upload Image</span>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                varient="outlined"
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Form.Group>
          </div>
          <div>
            <Button
              type="submit"
              id="btn-confirm"
              variant="contained"
              size="large"
            >
              Confirm
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default AddArtPiece;
