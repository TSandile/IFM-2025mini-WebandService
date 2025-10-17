import { useState } from "react";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../headers/DefaultHeader.css";
import "../headers/Profile.css";
import { useUser } from "../../pages/user/UserContext";

const Profile = () => {
  const navigate = useNavigate();

  //get user data and logout function
  const { user, logoutUser } = useUser();

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
    navigate("/", { replace: true });
    // navigate("/");
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
