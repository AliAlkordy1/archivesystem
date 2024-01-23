import React, { useState } from "react";

export default function Upload() {
  const [formData, setFormData] = useState({
    id: generateRandomId(),
    from: "",
    to: "",
    file: "",
    type: "",
    date: getFormattedDate(),
    time: getFormattedTime(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: file ? file.name : "",  // store the file name or path here
    }));

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (e) => {
      
      // Use fileContent as needed
    };
  };

  const handleRemoveFile = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: "",
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate inputs
      if (!formData.from || !formData.to || !formData.file || !formData.type) {
        console.error("Please enter all values.");
        return;
      }

      const response = await fetch("http://localhost:3001/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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

  function generateRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  function getFormattedTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    
    <div>
     {/* font awesome library */}
     <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
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
            <td>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <div id="file-upload-container">
                <label htmlFor="file-upload" className="file-label">
                  {formData.file ?  formData.file : "اختر الملف الذي تريده"}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  name="file"
                  onChange={handleFileChange}
                />
                {formData.file && (
                  <button type="button" onClick={handleRemoveFile}>
                  <i className="fa-regular fa-trash-can"></i>
                  </button>
                )}
              </div>
            </td>
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
            <td id="upload-button-final">
              <button type="button" onClick={handleSubmit}>
                Upload
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
