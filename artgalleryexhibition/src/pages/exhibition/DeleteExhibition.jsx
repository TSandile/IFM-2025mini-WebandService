import { Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import "../artist/ArtistManage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteExhibition = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    title: "",
    startdate: "",
    enddate: "",
    status: "",
    imageData: null,
  });

  const navigate = useNavigate();

  //handler for text input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchExhibition = async () => {
      try {
        const response = await fetch(
          `http://localhost:2025/api/v1/exhibition/getExhibition/${id}`
        );
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching exhibition:", error);
      }
    };
    fetchExhibition();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:2025/api/v1/exhibition/deleteExhibition/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Exhibition deleted successfully");
        alert("Exhibition deleted successfully");
        navigate("/manageExhibition");
      }
    } catch (error) {
      console.error("Error deleting exhibition:", error);
    }
  };

  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Delete Exhibition</h1>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label=" Exhibition Id"
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
                label="Exhibition Title"
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
            <Form.Group className="mb-3">
              <TextField
                label="start Date"
                varient="outlined"
                type="date"
                sx={{ width: 340 }}
                name="startdate"
                value={formData.start_date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3">
              <TextField
                label="End Date"
                varient="outlined"
                type="date"
                sx={{ width: 340 }}
                name="enddate"
                value={formData.end_date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Button
              style={{ width: "300px" }}
              type="submit"
              variant="danger"
              color="error"
            >
              Delete Exhibition
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default DeleteExhibition;
