import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "./user/UserContext";
import { useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./user/user.css";

const RegisterExhibition = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [nPeople, SetNPeople] = useState(1);

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    numberOfPeople: "",
  });

  const [exhibition, setExhibition] = useState({
    title: "",
    description: "",
    startdate: "",
    enddate: "",
    status: "",
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumber = (event) => {
    const { name, value } = event.target;
    SetNPeople(value);
  };

  useEffect(() => {
    const fetchArtPiece = async () => {
      try {
        const response = await fetch(
          `http://localhost:2025/api/v1/exhibition/getExhibition/${id}`
        );
        const data = await response.json();
        setExhibition(data);
        formData.title = data.title;
        formData.name = user.name;
        //formData.numberOfPeople = 1;
      } catch (error) {
        console.error("Error fetching Exhibition: ", error);
      }
    };
    fetchArtPiece();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.numberOfPeople = nPeople;
    console.log("Data to be submited: n People: " + formData.numberOfPeople);
    try {
      const response = fetch(
        `http://localhost:2025/api/v1/registration/register/${id}/${user.id}/${nPeople}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Alert("Registered successfully");

      navigate("/", { replace: true });
    } catch (error) {
      console.log("error resgistering: ", error.message);
    }
  };

  return (
    <>
      <div className="center-form-reg d-flex justify-content-center align-items-center">
        <h1>Exhibition Registration</h1>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                // className="text-field"
                id="outlined-basic"
                label="Exhibition Title"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="title"
                value={formData.title}
                // onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="User Name"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="name"
                value={formData.name}
                //  onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="Number of People"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="numberofpeople"
                value={nPeople}
                onChange={handleNumber}
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
              Confirm Registration
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default RegisterExhibition;
