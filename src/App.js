// App.js
/* import React, { useState } from "react"; */
import { Route, Routes, Navigate, useNavigate, Outlet } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashborad";
import Users from "./users";
import Files from "./Files";
import Upload from "./upload"; 
/* import ReqUpload from "./reqUpload.js"; */
import MyDepartment from "./myDepartment.js";
import UserFile from "./userFile.js";
import WardaUpload from "./wardaUpload.js";
import CreateUser from "./createUser.js";
import { useAppStore } from "./store";

export default function App() {
  // Destructure isLoggedIn and setLoggedIn from the global store
  const { isLoggedIn, setLoggedIn } = useAppStore();

  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle successful login
  const handleLoginSuccess = () => {
    // Call this function when login is successful
    setLoggedIn(true);
    navigate("/dashboard"); // Navigate to dashboard after login
  };

  return (
    <div>
      {/* Routes for handling navigation */}
      <Routes>
        {/* Route for the root path */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              // If user is logged in, redirect to the dashboard
              <Navigate to="/dashboard" />
            ) : (
              // If not logged in, render the login component
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Route for the dashboard with nested routes */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              // If user is logged in, render the Dashboard component with nested routes
              <Dashboard>
                <Outlet />
              </Dashboard>
            ) : (
              // If not logged in, redirect to the root path
              <Navigate to="/" />
            )
          }
        >
          {/* Nested routes for Users, Files, Upload, ReqUpload, MyDepartment, and UserFile */}
          <Route path="users" element={<Users />} />
          <Route path="files" element={<Files />} />
          <Route path="createUser" element={<CreateUser />} />
          {/* <Route path="upload" element={<Upload />} /> */}
          <Route path="Upload" element={<Upload />} />
          <Route path="myDepartment" element={<MyDepartment />} />
          <Route path="userFile" element={<UserFile />} />
          <Route path="wardaUpload" element={<WardaUpload />} />
        </Route>
      </Routes>
    </div>
  );
}
