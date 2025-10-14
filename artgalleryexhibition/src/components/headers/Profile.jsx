import { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import "../headers/DefaultHeader.css";
import "../headers/Profile.css";
import { useUser } from "../../pages/user/UserContext";

const Profile = () => {
  const location = useLocation();

  //get user data and logout function
  const { user, logoutUser } = useUser();
  // const [{ id, name, surname, email, password, type }, { onClick }] =
  //   location.state || {}; //prevent errors
  const [log, setLog] = useState();
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    type: "",
  });

  const HandleSignOut = () => {
    logoutUser(); //call function to clear user state
  };

  const Logged = () => {
    return (
      <>
        <div className="profile-component">
          <NavLink as={Link} to="" href="">
            {/* Logged in */}
            Welcome, {user.name} {user.type}
          </NavLink>
          <NavLink onClick={HandleSignOut}>Sign Out</NavLink>
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
      <div className="profile">
        {user != null && user.id > 0 ? <Logged /> : <NotLogged />}
      </div>
    </>
  );
};

export default Profile;
