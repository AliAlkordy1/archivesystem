import React, { useState, useEffect } from "react";
import usersData from "./users.json"; // Import the JSON file

export default function Users() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");
  const [originalUserData, setOriginalUserData] = useState([]);
  const [error] = useState(null);

  useEffect(() => {
    // Use the imported JSON data directly
    const users = usersData.users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));

    setUserData(users);
    setOriginalUserData(users);
  }, []);

  useEffect(() => {
    const filteredUsers = originalUserData.filter((user) => {
      const fieldValue = String(user[searchOption]).toLowerCase();
      return fieldValue.includes(searchTerm.toLowerCase());
    });

    setUserData(filteredUsers);
  }, [searchTerm, searchOption, originalUserData]);

  return (
    <div className="container-for-search">
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
        </select>
      </div>

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
