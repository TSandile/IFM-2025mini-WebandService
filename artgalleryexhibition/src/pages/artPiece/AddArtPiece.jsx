import { Form } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import "../artPiece/AddArtPiece.css";

const AddArtPiece = () => {
  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Add Art Piece</h1>
        <section className="form-section">
          <Form className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                className="text-field"
                id="outlined-basic"
                label="Art Piece Title"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
              />
            </Form.Group>
          </Form>

          <Form className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="Description"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
              />
            </Form.Group>
          </Form>

          <Form className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="Artist"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
              />
            </Form.Group>
          </Form>

          <Form className="d-flex justify-content-around">
            <span> Upload Image</span>
          </Form>

          <Form className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField varient="outlined" type="file" />
            </Form.Group>
          </Form>
        </section>
        <div>
          <Button id="btn-confirm" variant="contained" size="large">
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
};
export default AddArtPiece;
