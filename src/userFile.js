import React, { useState } from "react";
import { Link } from "react-router-dom";
import fileData from "./db"; // Import the JSON file
import { useAppStore } from "./store";

export default function Files({ getUserRole, getUserCollege }) {
  // State variables for managing search term, search option, and user name
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");
  const { userRole, userCollege, userName } = useAppStore();

  // Function to handle changes in the search term
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle changes in the search option
  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  // Filtered file data based on search term, search option, user role, user college, and user name
  const filteredFileData = fileData.files
    .filter((file) => file.userRole === userRole && file.userCollege === userCollege && file.userName === userName)
    .filter((file) => {
      const fieldValue = String(file[searchOption]).toLowerCase();
      return fieldValue.includes(searchTerm.toLowerCase());
    });

  return (
    <div className="container-for-search">
      {/* Search input and dropdown for filtering files */}
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="اضغط هنا للبحث عن ملف"
          value={searchTerm}
          onChange={handleSearchTermChange}
          style={{ direction: "rtl" }}
        />

        <select
          className="searchOption"
          value={searchOption}
          onChange={handleSearchOptionChange}
        >
          <option value="id">File ID</option>
          <option value="from">From</option>
          <option value="file">File</option>
          <option value="type">Type</option>
          <option value="date">Date</option>
          <option value="userRole">User Role</option>
          <option value="userCollege">User College</option>
          <option value="userName">User Name</option>
        </select>
      </div>

      {/* Table for displaying file data */}
      <table>
        <thead>
          <tr>
            <th>File ID</th>
            <th>bookNumber</th>
            <th>From</th>
            <th>File</th>
            <th>Type</th>
            <th>Date</th>
            <th>User Role</th>
            <th>User College</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through filtered file data and display relevant rows */}
          {filteredFileData.map((file) => (
            <tr key={file.id}>
              <td>{file.id}</td>
              <td>{file.bookNumber}</td>
              <td>{file.from}</td>
              <td>
                {/* Create a link to the file using React Router's Link component */}
                <Link className="link-file" to={file.fileLink}>
                  {file.file}
                </Link>
              </td>
              <td>{file.type}</td>
              <td>{file.date}</td>
              <td>{file.userRole}</td>
              <td>{file.userCollege}</td>
              <td>{file.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
