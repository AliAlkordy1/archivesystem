import React, { useState, useEffect } from "react";
import usersData from "./users.json"; // Import the JSON file
import { useAppStore } from "./store";

export default function MyDepartment() {
  // State variables for managing user data and search functionality
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");
  const [originalUserData, setOriginalUserData] = useState([]);
  const [error] = useState(null);
  const { useDep, userRole } = useAppStore(); // Accessing Department data and user role from store

  // Effect to initialize user data from the imported JSON file
  useEffect(() => {
    // Transform the raw data from users.json into a more usable format
    const users = usersData.users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      college: user.college,
      branch: user.branch,
      userRole: user.userRole,
      bookNumber:user.bookNumber, // Added the "type" field
    }));

    // Filter users based on the same college and userRole
    const filteredUsers = users.filter((user) => user.college === useDep && user.userRole === userRole);

    // Set both the current and original user data
    setUserData(filteredUsers);
    setOriginalUserData(filteredUsers);
  }, [useDep, userRole]);

  // Effect to filter user data based on search term and option
  useEffect(() => {
    // Filter users based on the selected search option and search term
    const filteredUsers = originalUserData.filter((user) => {
      const fieldValue = String(user[searchOption]).toLowerCase();
      return fieldValue.includes(searchTerm.toLowerCase());
    });

    // Update the displayed user data
    setUserData(filteredUsers);
  }, [searchTerm, searchOption, originalUserData]);

  return (
    <div className="container-for-search">
      {/* Search input and dropdown for filtering users */}
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="اضغط هنا للبحث عن مستخدمون"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ direction: "rtl" }}
        />

        <select
          className="searchOption"
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="userRole">userRole</option> {/* Added the "type" option */}
        </select>
      </div>

      {/* Display user data in a table */}
      {error ? (
        // Display an error message if there's an error
        <div className="error-message">{error}</div>
      ) : (
        // Display the user data in a table
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>college</th>
              <th>Type</th>
               {/* Added the "Type" column header */}
            </tr>
          </thead>
          <tbody>
            {/* Map through filtered user data and display relevant rows */}
            {userData.map((user) => (
              // Check if useDep is equal to the user's Department before rendering
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.college}</td>
                <td>{user.userRole}</td>
                 {/* Added the "type" field */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
