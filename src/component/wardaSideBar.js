import { Link } from "react-router-dom";

// UserSideBar component represents the sidebar for non-admin users
export default function WardaSideBar() {
  return (
    <div className="sideBar">
      {/* Link to navigate to the 'myDepartment' route */}
      <Link to="/dashboard/myDepartment" className="item-link">
        My Department
      </Link>

      {/* Link to navigate to the 'userFile' route */}
      <Link to="/dashboard/userFile" className="item-link">
      Documents
      </Link>

      {/* Link to navigate to the 'reqUpload' route */}
      <Link to="/dashboard/wardaUpload" className="item-link">
        Upload
      </Link>
    </div>
  );
}
