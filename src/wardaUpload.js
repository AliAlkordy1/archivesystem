import React, { useState } from "react";
import { useAppStore } from "./store";

export default function WardaUpload({ getUserRole, getUserCollege }) {
  const [formData, setFormData] = useState({
    bookNumber: "",
    from: "",
    bookName: "",
    date: "",
    Conclusion: "",
    secret: "",
    file: null,
  });
  const { userRole, useDep, userName } = useAppStore();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleRemoveFile = () => {
    setFormData({
      ...formData,
      file: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    const requiredFields = ["bookNumber", "from", "bookName", "date", "Conclusion", "secret", "file"];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      // Alert the user about missing fields
      alert("الرجاء ملء جميع الحقول");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "_" + Math.random().toString(36).substr(2, 9),
          bookNumber: formData.bookNumber,
          from: formData.from,
          bookName: formData.bookName,
          date: formData.date,
          Conclusion: formData.Conclusion,
          type: formData.secret === "secret" ? "سري" : "غير سري",
          file: formData.file ? formData.file.name : null,
          userRole: userRole,
          userCollege: useDep,
          userName: userName, // Include the userName field
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data to the server");
      }

      // Reset the form after successful submission
      handleDelete();
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const handleDelete = () => {
    // Reset the form data
    setFormData({
      bookNumber: "",
      from: "",
      bookName: "",
      date: "",
      Conclusion: "",
      secret: "",
      file: null,
    });
  };


  return (
    <div>
      <div>
        <form action="/action_page.php" id="upload-file" dir="rtl">
          <label htmlFor="bookNumber">رقم الكتاب</label>
          <input
            type="text"
            id="bookNumber"
            name="bookNumber"
            value={formData.bookNumber}
            onChange={handleInputChange}
            placeholder="ادخل رقم الكتاب"
          ></input>

          <label htmlFor="from">الجهة الواردة</label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleInputChange}
            placeholder="ادخل الجهة الواردة"
          ></input>

          <label htmlFor="bookName">عنوان الكتاب</label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            value={formData.bookName}
            onChange={handleInputChange}
            placeholder="ادخل عنوان الكتاب"
          ></input>

          <div>
            <label htmlFor="date">تاريخ الاصدار</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            ></input>
          </div>

          <label htmlFor="Conclusion">الخلاصة</label>
          <textarea
            id="Conclusion"
            name="Conclusion"
            value={formData.Conclusion}
            onChange={handleInputChange}
            placeholder="اكتب هنا"
          ></textarea>

          <div>
            <label htmlFor="secret">سرية الكتاب</label>
            <div id="secret">
              <input
                type="radio"
                name="secret"
                value="secret"
                checked={formData.secret === "secret"}
                onChange={handleInputChange}
              />
              <label htmlFor="secret">سري</label>
              <input
                type="radio"
                name="secret"
                value="notSecret"
                checked={formData.secret === "notSecret"}
                onChange={handleInputChange}
              />
              <label htmlFor="notSecret">غير سري</label>
            </div>
          </div>
          <label htmlFor="book">اضغط هنا لرفع الكتاب</label>
          <div className="file-upload-button">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              className="custom-file-input"
            ></input>
            {formData.file && (
              <div>
                <p>File: {formData.file.name}</p>
                <button
                  type="button"
                  className="remove-file-button"
                  onClick={handleRemoveFile}
                >
                  حذف الكتاب
                </button>
              </div>
            )}
          </div>
          <div>
            <input
              type="button"
              value="اضافة"
              id="upload-submit"
              onClick={handleSubmit}
            ></input>
            <input
              type="button"
              value="حذف"
              id="upload-delete"
              onClick={handleDelete}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
