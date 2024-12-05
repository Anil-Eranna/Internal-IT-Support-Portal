import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import "./Navbar.css";
import logo from '../../images/ITLogo.png';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((State) => State.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  const navigateToHome = () => {
    navigate("/home");
  }

  return (
    <div className="navbar">
      <div className="Logo">
        <img src={logo} alt="Logo" onClick={navigateToHome} />
        <h4>Welcome {user?.email || "Guest"}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 logout"
          onClick={handleLogout}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
          />
        </svg>
      </div>
    </div>
  );
}

export default Navbar;