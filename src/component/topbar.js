// TopBar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";


export default function TopBar(  ) {

  const navigate = useNavigate();
  const { setLoggedIn } = useAppStore();


  const handleLogout = () => {
    // Call the onLogout function passed as a prop to update the parent component
    sessionStorage.clear();
    setLoggedIn(false);
    // Navigate to the home ("/") route
    navigate("/");
  };

  return (
    <div className="container d-flex top-bar">
      <img src={require('./klipartz.com.png')} alt="logo" id="logo-img"/>
      <button onClick={handleLogout} id="go-to-website-button">
        Log out
      </button>
    </div>
  );
}
