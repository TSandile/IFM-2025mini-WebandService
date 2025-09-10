import { Form } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import "../artist/ArtistManage.css";

const ArtistManage = () => {
  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Add Artist</h1>
        <section className="form-section">
          <Form className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                className="text-field"
                id="outlined-basic"
                label="Artist Name"
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
                label="Biography"
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

export default ArtistManage;
