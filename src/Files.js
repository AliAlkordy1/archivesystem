import React, { useState } from "react";
import { Link } from "react-router-dom";
import fileData from "./db"; // Import the JSON file

export default function Files() {
  // State variables for managing search term and search option
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");

  // Filtered file data based on search term and search option
  const filteredFileData = fileData.files.filter((file) => {
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
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ direction: "rtl" }}
        />

        <select
          className="searchOption"
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
        >
          <option value="id">File ID</option>
          <option value="bookNumber">Book Number</option>
          <option value="from">From</option>
          <option value="file">File</option>
          <option value="type">Type</option>
          <option value="date">Date</option>
          <option value="userRole">User Role</option>
          <option value="userCollege">User College</option>
          <option value="userName">User Name</option> {/* Added the "userName" option */}
        </select>
      </div>

      {/* Table for displaying file data */}
      <table>
        <thead>
          <tr>
            <th>File ID</th>
            <th>Book Number</th>
            <th>From</th>
            <th>File</th>
            <th>Type</th>
            <th>Date</th>
            <th>User Role</th>
            <th>User College</th>
            <th>User Name</th> {/* Added the "User Name" column header */}
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
              <td>{file.userName}</td> {/* Added the "userName" field */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
