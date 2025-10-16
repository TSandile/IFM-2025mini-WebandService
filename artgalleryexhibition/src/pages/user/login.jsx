import "../user/user.css";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUser } from "./UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // user context hook  to use the login function
  const { loginUser } = useUser();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //clear state
  //   const clearUserData = () => {
  //     setUser(null);
  //     console.log("Data cleared? : " + user);
  //   };

  //specific handler for submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("form data submitted:", formData);

    // const dataTosSend = new FormData();
    // dataTosSend.append("name", formData.name);
    // dataTosSend.append("biography", formData.biography);
    // dataTosSend.append("image", formData.image);

    try {
      const response = await fetch(
        "http://localhost:2025/api/v1/user/login",

        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data != null) {
          loginUser(data);

          setUser(data);
          console.log("sign in user:", user);
          //  navigate("/");
        } else {
          alert("Login unsuccessfult");
        }
      } else if (!response.error) {
        alert("Login  faild. Please check your credentials.");
      }
      navigate("/", { replace: true });
    } catch (error) {
      console.log("error signing in user", error.message);
    }
  };

  return (
    <>
      <div className="center-form-log d-flex justify-content-center align-items-center">
        <h1>User Sign In</h1>
        <Form onSubmit={handleSubmit}>
          {/* <div className="d-flex justify-content-around">
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
          </div> */}

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
              Sign In
            </Button>
          </div>

          <div className="d-flex justify-content-around">
            <NavLink as={Link} to="/register" href="">
              Don't have account yet?, Register
            </NavLink>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Login;
