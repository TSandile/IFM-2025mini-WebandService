import { Form } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import "../artist/ArtistManage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddArtist = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    biography: "",
    image: null,
  });

  //handler for text input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
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

  //specific handler for submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("form data submitted:", formData);

    const dataTosSend = new FormData();
    dataTosSend.append("name", formData.name);
    dataTosSend.append("biography", formData.biography);
    dataTosSend.append("image", formData.image);

    try {
      const response = await fetch(
        "http://localhost:2025/api/v1/artists/uploadArtist",

        {
          method: "POST",
          body: dataTosSend,
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      );

      const data = await response.text();
      console.log("added artist:", data);
    } catch (error) {
      console.log("error adding artist", error.message);
    }

    alert(" Artist form data submitted");

    //reset the form to their initial state
    // setFormData({
    //   name: "",
    //   biography: "",
    //   image: null,
    // });
  };

  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Add Artist</h1>
        <Form onSubmit={handleSubmit}>
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
              Confirm
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddArtist;
