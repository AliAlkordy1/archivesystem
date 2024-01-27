// TopBar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";

// TopBar component represents the top navigation bar in the application
export default function TopBar() {
  // React Router hook for navigation
  const navigate = useNavigate();

  // Accessing setLoggedIn function from the global store
  const { setLoggedIn } = useAppStore();

  // Function to handle the logout button click
  const handleLogout = () => {
    // Clear the session storage, update the login status, and navigate to the home ("/") route
    sessionStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="container d-flex top-bar">
      {/* Logo image */}
      <img src={require('./klipartz.com.png')} alt="logo" id="logo-img" />

      {/* Logout button */}
      <button onClick={handleLogout} id="go-to-website-button">
        Log out
      </button>
    </div>
  );
}
