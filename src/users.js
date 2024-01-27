import React, { useState, useEffect } from "react";
import usersData from "./users.json"; // Import the JSON file

export default function Users() {
  // State variables for managing user data and search functionality
  const [userData, setUserData] = useState([]); // Holds the current user data to be displayed
  const [searchTerm, setSearchTerm] = useState(""); // Holds the search term entered by the user
  const [searchOption, setSearchOption] = useState("id"); // Holds the selected search option
  const [originalUserData, setOriginalUserData] = useState([]); // Holds the original user data (unfiltered)
  const [error] = useState(null); // Placeholder for handling errors (not currently used)

  // Load user data from the JSON file on component mount
  useEffect(() => {
    // Transform the imported JSON data to the desired format
    const users = usersData.users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      department:user.department,
    }));

    // Set both the current and original user data
    setUserData(users);
    setOriginalUserData(users);
  }, []);

  // Update user data based on search criteria whenever searchTerm or searchOption changes
  useEffect(() => {
    // Filter users based on the selected search option and search term
    const filteredUsers = originalUserData.filter((user) => {
      const fieldValue = String(user[searchOption]).toLowerCase();
      return fieldValue.includes(searchTerm.toLowerCase());
    });

    // Update the current user data with the filtered results
    setUserData(filteredUsers);
  }, [searchTerm, searchOption, originalUserData]);

  return (
    <div className="container-for-search">
      {/* Search input and select for filtering */}
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="اضغط هنا للبحث عن مستخدمون"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ direction: "rtl" }} // Right-to-left direction for Arabic text
        />

        <select
          className="searchOption"
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
        >
          {/* Dropdown menu for selecting the search option */}
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      {/* Display user data in a table */}
      {error ? (
        // Display an error message if needed (not currently used)
        <div className="error-message">{error}</div>
      ) : (
        // Display the table with user data
        <table>
          <thead>
            {/* Table header with column names */}
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>department</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through user data and display each user in a table row */}
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
