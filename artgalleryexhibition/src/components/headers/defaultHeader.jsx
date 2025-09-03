import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

import "../headers/DefaultHeader.css";

const DefaultHeader = () => {
  return (
    <>
      <div id="nav-body">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container id="navbar">
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
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default DefaultHeader;
