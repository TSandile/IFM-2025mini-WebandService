import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import "../headers/Profile.css";
import { Nav, NavDropdown } from "react-bootstrap";
import { useUser } from "../../pages/user/UserContext";

const StaffProfile = () => {
  const location = useLocation();
  // const { id, name, surname, email, password, type } = location.state || {}; //prevent errors

  const [position, setPosition] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (user && user.type) {
      setPosition(user.type.toLowerCase());
    } else {
      setPosition("");
    }
  }, [user]);

  const displayStaffField = () => {
    //setPosition(user.type);

    if (position === "manager") {
      return (
        <>
          <div className="dropdown-nav">
            <NavDropdown title="Management Portal" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="manageArtPieces">
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
                <NavDropdown.Item as={Link} to="manageArtist">
                  Show All Artists
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                style={{ textAlign: "center" }}
                title="Manage Exhibitions"
                id="basic-nav-dropdown"
                className="custom-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="manageExhibition">
                  Show All Exhibitions
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
          <div className="dropdown-nav">
            <NavDropdown title="Clerk Portal" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="manageExhibition">
                Manage Exhibition
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="">
                Registration Management
              </NavDropdown.Item>
            </NavDropdown>
          </div>
          {/* <div className="dropdwon-nav">
            <NavLink as={Link} to="" href="">
              Registrations
            </NavLink>
            {}
            <NavLink as={Link} to="" href="manageExhibition">
              Exhibition Management
            </NavLink>
          </div> */}
        </>
      );
    } else if (position === "") {
      return <></>;
    }
  };

  return <>{displayStaffField()}</>;
};

export default StaffProfile;
