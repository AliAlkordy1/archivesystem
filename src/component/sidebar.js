import { Link } from "react-router-dom";

// sideBar component represents the sidebar for admin users
export default function sideBar() {
  return (
    <div className="sideBar">
      {/* Link to navigate to the 'users' route */}
      <Link to="/dashboard/users" className="item-link">
        Users
      </Link>

      <Link to="/dashboard/createUser" className="item-link" > Create User </Link>
      {/* Link to navigate to the 'Files' route */}
      <Link to="/dashboard/Files" className="item-link">
      Documents
      </Link>
      {/* Link to navigate to the 'Upload' route */}
      {/* <Link to="/dashboard/Upload" className="item-link">
        Upload
      </Link> */}
    </div>
  );
}
