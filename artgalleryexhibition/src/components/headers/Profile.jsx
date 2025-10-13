import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../headers/DefaultHeader.css";
import "../headers/Profile.css";

const Profile = () => {
  const [log, setLog] = useState(false);

  const Logged = () => {
    return (
      <>
        <div className="profile-component">
          <NavLink as={Link} to="" href="">
            Logged in
          </NavLink>
        </div>
      </>
    );
  };

  const NotLogged = () => {
    return (
      <>
        <div className="profile-component">
          <NavLink as={Link} to="register" href="">
            Sign Up
          </NavLink>
          {}
          <NavLink as={Link} to="login" href="">
            Sign In
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="profile">{log ? <Logged /> : <NotLogged />}</div>
    </>
  );
};

export default Profile;
