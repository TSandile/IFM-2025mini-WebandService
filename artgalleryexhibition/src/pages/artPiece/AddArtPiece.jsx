import { Form } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import "../artPiece/AddArtPiece.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddArtPiece = () => {
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   artist: { name: "", biography: "", image: null },
  //   image: null,
  // });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    artist: {
      name: "",
      biography: "",
      image: null,
    },
  });

  const [pieceImage, setPieceImage] = useState(null);
  const [artistImage, setArtistImage] = useState(null);

  const handleArtPieceImage = (e) => {
    setPieceImage(e.target.files[0]);
  };

  const handleArtistImage = (e) => {
    setArtistImage(e.target.files[0]);
  };
  // Handler for standard text inputs (handles nesting for artist fields)
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name in formData.artist) {
      // Handle nested artist fields
      setFormData((prev) => ({
        ...prev,
        artist: {
          ...prev.artist,
          [name]: value,
        },
      }));
    } else {
      // Handle top-level fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("form data submitted:", formData);
    // formData.artist.artistImg = artistImage;
    // formData.artImg = pieceImage;
    console.log("--- Form Submitted ---");
    console.log("Art Piece Data:", formData);
    console.log("Art Piece Image:", pieceImage ? pieceImage.name : "No file");
    console.log("Artist Image:", artistImage ? artistImage.name : "No file");

    formData.image = pieceImage;
    formData.artist.image = artistImage;

    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("image", pieceImage);
    dataToSend.append("name", formData.artist.name);
    dataToSend.append("biography", formData.artist.biography);
    dataToSend.append("image", artistImage);

    try {
      const response = await fetch(
        "http://localhost:2025/api/v1/artPiece/uploadArtPiece",
        {
          method: "POST",
          body: dataToSend,
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      );

      const data = await response.text();
      console.log("added artpiece:", data);
      navigate("/manageArtPieces");
    } catch (error) {
      console.log("error adding art piece", error.message);
    }

    alert(" Art Piece submitted");
  };

  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Add Art Piece Section</h1>
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
            <span> Upload ArtPiece Image</span>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                varient="outlined"
                type="file"
                name="file"
                onChange={handleArtPieceImage}
                // inputProps={{ accept: "image/*" }}
              />
            </Form.Group>
          </div>
          <hr />
          {/* Add artist section start */}
          <div className="d-flex justify-content-around">
            <h1>Add Artist Section</h1>
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
                value={formData.artist.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="Biography"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="biography"
                value={formData.artist.biography}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around"></div>

          <div className="d-flex justify-content-around">
            <span> Upload Artist Image</span>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                varient="outlined"
                type="file"
                name="file"
                onChange={handleArtistImage}
                // InputProps={{ inputProps: { accept: "images/*" } }}
              />
            </Form.Group>
          </div>
          {/* Add artist section end */}
          <div className="d-flex justify-content-around">
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
