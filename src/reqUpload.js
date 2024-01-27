import React, { useState } from "react";

export default function ReqUplaod() {
  // State to manage form data
  const [formData, setFormData] = useState({
    id: generateRandomId(), // Generate a unique ID for each form submission
    from: "",
    to: "",
    file: "",
    type: "",
    date: getFormattedDate(),
    time: getFormattedTime(),
  });

  // Handle input changes (text inputs)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: file ? file.name : "",  // Store the file name or path here
    }));

    // Read the file content if needed
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (e) => {
      // Use fileContent as needed
    };
  };

  // Handle removing the selected file
  const handleRemoveFile = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: "",
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate inputs
      if (!formData.from || !formData.to || !formData.file || !formData.type) {
        console.error("Please enter all values.");
        return;
      }

      // Send form data to the server
      const response = await fetch("http://localhost:3001/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the server response is successful
      if (response.ok) {
        console.log("Form data successfully sent to the server!");

        // Optionally, reset the form after a successful submission
        setFormData({
          id: generateRandomId(),
          from: "",
          to: "",
          file: "",
          type: "",
          date: getFormattedDate(),
          time: getFormattedTime(),
        });
      } else {
        console.error("Error sending form data to the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to generate a random ID
  function generateRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  // Function to get the current date in a formatted string
  function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  // Function to get the current time in a formatted string
  function getFormattedTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return (
    <div>
      {/* Include the Font Awesome library */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
  
      {/* Table for uploading files */}
      <table className="upload-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>File</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Input field for 'From' */}
            <td>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
              />
            </td>
            
            {/* Input field for 'To' */}
            <td>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
              />
            </td>
            
            {/* File upload section */}
            <td>
              <div id="file-upload-container">
                {/* Label for file input */}
                <label htmlFor="file-upload" className="file-label">
                  {formData.file ? formData.file : "اختر الملف الذي تريده"}
                </label>
                
                {/* File input */}
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  name="file"
                  onChange={handleFileChange}
                />
                
                {/* Display file removal button if a file is selected */}
                {formData.file && (
                  <button type="button" onClick={handleRemoveFile}>
                    {/* Font Awesome trash can icon */}
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                )}
              </div>
            </td>
            
            {/* Dropdown for selecting file type */}
            <td>
              <select
                id="select-upload"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={{ direction: "rtl" }}
              >
                <option value="">اختر</option>
                <option value="صادرة">صادرة</option>
                <option value="واردة">واردة</option>
              </select>
            </td>
            
            {/* Upload button */}
            <td id="upload-button-final">
              <button type="button" onClick={handleSubmit}>
              Request
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
                }  