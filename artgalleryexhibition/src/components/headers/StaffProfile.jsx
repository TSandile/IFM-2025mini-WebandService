import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../headers/Profile.css";
import { Nav, NavDropdown } from "react-bootstrap";

const StaffProfile = () => {
  const [position, setPosition] = useState("owner");

  const displayStaffField = () => {
    if (position === "manager") {
      return (
        <>
          <div className="dropdown-nav">
            <NavDropdown title="Management Portal" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="">
                Manage Art Piece
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="">
                Report Management
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </>
      );
    } else if (position === "owner") {
      return (
        <>
          <div className="dropdown-nav">
            <NavDropdown
              title="Owner Management"
              id="basic-nav-dropdown"
              drop="end"
              className="custom-nav-dropdown"
            >
              <NavDropdown
                style={{ textAlign: "center" }}
                title="Manage Art Pieces"
                id="basic-nav-dropdown"
                className="custom-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="manageArtpieces">
                  Show All Art Pieces
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="addartpiece">
                  Add New Art
                </NavDropdown.Item>
              </NavDropdown>
              {/* manage art piece */}

              {/* <NavDropdown.Item as={Link} to="addartpiece">
                Manage Art Pieces
              </NavDropdown.Item> */}

              <NavDropdown
                style={{ textAlign: "center" }}
                title="Manage Artists"
                id="basic-nav-dropdown"
                className="custom-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="addartist">
                  Add New Artist
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="">
                  Show All Artists
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                style={{ textAlign: "center" }}
                title="Manage Exhibitions"
                id="basic-nav-dropdown"
                className="custom-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="">
                  Show All Ehibitions
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="addexhibition">
                  Add New Exhibition
                </NavDropdown.Item>
              </NavDropdown>

              {/* manage exhibition*/}
              {/* <NavDropdown.Item as={Link} to="addexhibition">
                Manage Exhibitions
              </NavDropdown.Item> */}
            </NavDropdown>
          </div>
        </>
      );
    } else if (position === "clerk") {
      return (
        <>
          <div className="dropdwon-nav">
            <NavLink as={Link} to="" href="">
              Registrations
            </NavLink>
            {}
            <NavLink as={Link} to="" href="">
              Exhibition Management
            </NavLink>
          </div>
        </>
      );
    } else if (position === "null") {
      return <></>;
    }
  };

  return <>{displayStaffField()}</>;
};

export default StaffProfile;
