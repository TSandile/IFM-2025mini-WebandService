import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaPalatte, FaCube, FaUsers, FaImages } from "react-icons/fa";

import "../headers/defNav.css";
//import "../headers/DefaultHeader.css";
import Profile from "./Profile";
import StaffProfile from "./StaffProfile";
import { useUser } from "../../pages/user/UserContext";
import { useNavigate } from "react-router-dom";

const DefaultHeader = () => {
  // get login and logout function
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" id="def-nav">
        <Container>
          <Navbar.Brand to="/" id="brand" href="home">
            Art Gallery Exhibition
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink
              to="/"
              href="home"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "black" : "white",

                  border: isActive ? "1px solid grey" : "none",
                  padding: isActive ? "10px" : "10px",
                  margin: "20px 5px",

                  backgroundColor: isActive ? "grey" : "transparent",
                };
              }}
            >
              <FaHome style={{ marginBottom: "5px", marginRight: "4px" }} />
              Home
            </NavLink>
            <NavLink
              as={Link}
              to="exhibitions"
              href="exhibitions"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "black" : "white",

                  border: isActive ? "1px solid grey" : "none",
                  padding: isActive ? "10px" : "10px",
                  margin: "20px 5px",

                  backgroundColor: isActive ? "grey" : "transparent",
                };
              }}
            >
              <FaCube style={{ marginBottom: "5px", marginRight: "4px" }} />
              Exhibitions
            </NavLink>
            <NavLink
              to="artpieces"
              href="artpieces"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "black" : "white",

                  border: isActive ? "1px solid grey" : "none",
                  padding: isActive ? "10px" : "10px",
                  margin: "20px 5px",

                  backgroundColor: isActive ? "grey" : "transparent",
                  // fontWeight: isActive ? "bold" : "",
                  // color: isActive ? "red" : "white",

                  // border: isActive ? "1px solid grey" : "none",
                  // padding: isActive ? "10px" : "10px",
                  // margin: "20px 5px",
                  // borderRadius: "4px",
                };
              }}
            >
              <FaImages style={{ marginBottom: "5px", marginRight: "4px" }} />
              Art Pieces
            </NavLink>
            <NavLink
              to="artists"
              href="artists"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "black" : "white",

                  border: isActive ? "1px solid grey" : "none",
                  padding: isActive ? "10px" : "10px",
                  margin: "20px 5px",

                  backgroundColor: isActive ? "grey" : "transparent",
                };
              }}
            >
              <FaUsers style={{ marginBottom: "5px", marginRight: "4px" }} />
              Featured Artists
            </NavLink>
          </Nav>
          <StaffProfile />
          <div id="profile" className="d-flex align-items-center">
            <Profile />
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default DefaultHeader;
