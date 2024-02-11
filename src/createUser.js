import React, { useState } from "react";

export default function CreateUser() {
  const initialFormData = {
    id: generateRandomId(),
    name: "",
    email: "",
    password: "",
    userType: "",
    department: "",
    userRole: "user",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" && value.length < 8) {
      setPasswordErrorMessage("Password must be at least 8 characters long");
    } else {
      setPasswordErrorMessage("");
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPasswordErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === "")) {
      alert("Please fill in all fields");
      return;
    }

    if (formData.password.length < 8) {
      setPasswordErrorMessage("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Server response:", response);

      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error uploading user:", error);
    }
  };

  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }

  return (
    <div id="user-input-container">
      <form id="user-input" onSubmit={handleSubmit}>
        <label htmlFor="fname">User Name</label>
        <input
          type="text"
          id="fname"
          name="name"
          placeholder="User Name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="lname">Email</label>
        <input
          type="email"
          name="email"
          placeholder="User Email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="lname">Password</label>
        <input
          type="password"
          name="password"
          placeholder="User Password"
          value={formData.password}
          onChange={handleChange}
        />

        {passwordErrorMessage && <p className="error">{passwordErrorMessage}</p>}
        <label htmlFor="type">Type</label>
        <select name="userType" value={formData.userType} onChange={handleChange}>
          <option value="" disabled>
            Select the type of user
          </option>
          <option value="صادرة">صادرة</option>
          <option value="واردة">واردة</option>
        </select>

        <label htmlFor="college">College</label>
        <select name="department" value={formData.department} onChange={handleChange}>
          <option value="" disabled>
            Choose the user college
          </option>
          <option value="Computer Science">Computer Science</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
        </select>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
