import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./component/header";
import jsonData from "./users.json"; // Update the path accordingly
import { useAppStore } from "./store";

export default function Login({ onLoginSuccess }) {
  // React Router hook for navigation
  const navigate = useNavigate();

  // State variables for email, password, and acceptance status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);

  // State variables for error messages
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Accessing setUserRole and setDep functions from the store
  const { setUserRole, setDep } = useAppStore();
  const{ setUserCollege } = useAppStore();
  const {setUserName}=useAppStore();
  // Function to handle form submission
  function submit(e) {
    e.preventDefault();
    setAccept(true);

    // Check if the password meets the minimum length requirement
    let flag = password.length >= 8;

    if (flag) {
      // Check if user data is available
      if (jsonData.users && jsonData.users.length > 0) {
        // Find the user with the provided email and password
        const user = jsonData.users.find(
          (user) => user.email === email && user.password === password
        );

        // Set the user's department in the store
        setDep(user?.college);
        // If user is found
        
        if (user) {
          if (user.userRole === "صادرة") {
            console.log("Setting user role:", user.userRole);
            setUserRole("صادرة");
          } else if (user.userRole === "واردة") {
            console.log("Setting user role:", user.userRole);
            setUserRole("واردة");
          } else {
            console.log("Setting user role:", user.userRole);
            setUserRole("admin"); // Set a default role if the role is not recognized
          }
          setUserCollege(user.college);
          setUserName(user.name);
          console.log("Setting user role:", user.userRole);
          // Set email in local storage, trigger login success callback, and navigate to the dashboard
          window.localStorage.setItem("email", email);
          onLoginSuccess();
          setUserRole(user.userRole);
          navigate("/dashboard");
        } else {
          setEmailError("Invalid email or password");
          setPasswordError(""); // Clear password error when email is incorrect
        }
      } else {
        setEmailError("User data not available");
      }
    } else {
      setPasswordError("The password must be more than 8 characters.");
      setEmailError(""); // Clear email error when the password is less than 8 characters
    }
  }

  return (
    <div>
      {/* Render the Header component */}
      <Header />
      <div className="father-sign-up">
        {/* Form for user login */}
        <form onSubmit={submit}>
          {/* Email input */}
          <label htmlFor="email"> Email: </label>
          <input
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          
          

          {/* Password input */}
          <label htmlFor="password"> Password: </label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {/* Display password error if any */}
          {accept && passwordError && <p className="error">{passwordError}</p>}
          {/* Display email error if any */}
          {accept && emailError && <p className="error">{emailError}</p>}
          {/* Submit button */}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
