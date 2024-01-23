import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./component/header";

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");

  function submit(e) {
    e.preventDefault();
    setAccept(true);

    let flag = Password.length >= 8;

    if (flag) {
      // Assuming the JSON data is fetched from a file or API endpoint
      const jsonData = require("./sample4.json");

      const user = jsonData.people.find(
        (person) => person.email === Email && person.password === Password
      );

      if (user) {
        // Successful login
        window.localStorage.setItem("email", Email);
        onLoginSuccess();
        navigate("/dashboard");
      } else {
        // Incorrect email or password
        setEmailError("Invalid email or password");
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="father-sign-up">
        <form onSubmit={submit}>
          <label htmlFor="Email"> Email: </label>
          <input
            id="Email"
            placeholder="Email"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          {accept && emailError && (
            <p className="error">{emailError}</p>
          )}
          <label htmlFor="password"> Password: </label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {Password.length < 8 && accept && (
            <p className="error">The password must be more than 8 characters.</p>
          )}

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
