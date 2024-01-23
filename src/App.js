// App.js
/* import React, { useState } from "react"; */
import { Route, Routes, Navigate, useNavigate, Outlet } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashborad";
import Users from "./users";
import Files from "./Files";
import Upload from "./upload";
import {useAppStore} from "./store"

export default function App() {
  const { isLoggedIn, setLoggedIn } = useAppStore();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Call this function when login is successful
    setLoggedIn(true);
    navigate("/dashboard"); // Navigate to dashboard after login
  };



  return (
    <div>
      {/* Pass onLogout prop to TopBar */}
              
      
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard >
                <Outlet />
              </Dashboard>
            ) : (
              <Navigate to="/" />
            )
          }
        >
          {/* Nested routes for Files and Upload */}
          <Route path="users" element={<Users />} />
          <Route path="files" element={<Files />} />
          <Route path="upload" element={<Upload />} />
        </Route>
      </Routes>
    </div>
  );
}
