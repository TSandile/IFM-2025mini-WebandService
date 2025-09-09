import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

import "../headers/defNav.css";
//import "../headers/DefaultHeader.css";
import Profile from "./Profile";
import StaffProfile from "./StaffProfile";

const DefaultHeader = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" id="def-nav">
        <Container>
          <Navbar.Brand to="/" id="brand" href="">
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink
              to="/"
              href=""
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "red" : "white",
                };
              }}
            >
              Home
            </NavLink>
            <NavLink
              as={Link}
              to="exhibitions"
              href=""
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "red" : "white",
                };
              }}
            >
              Exhibitions
            </NavLink>
            <NavLink
              to="artpieces"
              href=""
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "red" : "white",
                };
              }}
            >
              Art Pieces
            </NavLink>
            <NavLink
              to="artists"
              href=""
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "red" : "white",
                };
              }}
            >
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
