import "../user/user.css";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    type: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //specific handler for submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("form data submitted:", formData);

    const dataTosSend = new FormData();
    dataTosSend.append("name", formData.name);
    dataTosSend.append("surname", formData.surname);
    dataTosSend.append("email", formData.email);
    dataTosSend.append("password", formData.password);
    dataTosSend.append("type", (formData.type = ""));

    try {
      const response = await fetch(
        "http://localhost:2025/api/v1/user/register",

        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("Error adding user");
      }
      const data = await response.text();
      alert("Added user");
      console.log("added new user:", data);
      navigate("/login");
    } catch (error) {
      console.log("error adding user", error.message);
    }
  };
  return (
    <>
      <div className="center-form-reg d-flex justify-content-center align-items-center">
        <h1>User Registration</h1>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                className="text-field"
                id="outlined-basic"
                label="Name"
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
                label="Surname"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="Email Address"
                varient="outlined"
                type="email"
                sx={{ width: 340 }}
                //for dynamic data
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="Password"
                varient="outlined"
                type="password"
                sx={{ width: 340 }}
                //for dynamic data
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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
              Sign Up
            </Button>
          </div>

          <div className="d-flex justify-content-around">
            <NavLink as={Link} to="/login" href="">
              Already have account?, Sign in
            </NavLink>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Register;
