import React, { useState } from "react";
import { Link } from "react-router-dom";
import fileData from "./db"; // Import the JSON file
import { useAppStore } from "./store";

export default function UserFile() {
  // State variables for search functionality
  const [searchTerm, setSearchTerm] = useState(""); // Holds the search term entered by the user
  const [searchOption, setSearchOption] = useState("id"); // Holds the selected search option

  // Get the department from the global state using a custom hook
  const { useDep } = useAppStore();

  // Filter files based on search criteria
  const filteredFileData = fileData.files.filter((file) => {
    // Convert the field value to lowercase for case-insensitive comparison
    const fieldValue = String(file[searchOption]).toLowerCase();
    // Check if the search term is included in the field value
    return fieldValue.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container-for-search">
      {/* Search input and select for filtering */}
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="اضغط هنا للبحث عن ملف"
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
          <option value="id">File ID</option>
          <option value="from">From</option>
          <option value="to">To</option>
          <option value="file">File</option>
          <option value="type">Type</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
      </div>

      {/* Table displaying filtered file data */}
      <table>
        <thead>
          <tr>
            <th>File ID</th>
            <th>From</th>
            <th>To</th>
            <th>File</th>
            <th>Type</th>
            <th>Department</th> 
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredFileData.map((file) => (
            // Check if useDep is equal to the file's department
            useDep === file.department && (
              <tr key={file.id}>
                {/* Display file details in table cells */}
                <td>{file.id}</td>
                <td>{file.from}</td>
                <td>{file.to}</td>
                <td>
                  {/* Link to the file with a styled class */}
                  <Link className="link-file" to={file.fileLink}>
                    {file.file}
                  </Link>
                </td>
                <td>{file.type}</td>
                <td>{file.department}</td> 
                <td>{file.date}</td>
                <td>{file.time}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}
