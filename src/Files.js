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
          <option value="from">From</option>
          <option value="to">To</option>
          <option value="file">File</option>
          <option value="type">Type</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
      </div>

      {/* Table for displaying file data */}
      <table>
        <thead>
          <tr>
            <th>File ID</th>
            <th>From</th>
            <th>To</th>
            <th>File</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through filtered file data and display relevant rows */}
          {filteredFileData.map((file) => (
            <tr key={file.id}>
              <td>{file.id}</td>
              <td>{file.from}</td>
              <td>{file.to}</td>
              <td>
                {/* Create a link to the file using React Router's Link component */}
                <Link className="link-file" to={file.fileLink}>
                  {file.file}
                </Link>
              </td>
              <td>{file.type}</td>
              <td>{file.date}</td>
              <td>{file.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
