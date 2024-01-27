import React from "react";
import TopBar from "./component/topbar";
import UserSidebar from "./component/UserSideBar";
import Sidebar from "./component/sidebar";
import { Outlet } from "react-router-dom";

import { useAppStore } from "./store";

export default function Dashboard() {
  // Destructure userRole from the global store
  const { userRole } = useAppStore();

  return (
    <div>
      {/* Render the top bar component */}
      <TopBar />

      <div className="content-flex">
        {/* Check userRole and render the appropriate sidebar */}
        {userRole === false ? (
          // Render the UserSidebar component for non-admin users
          <UserSidebar />
        ) : userRole === true ? (
          // Render the Sidebar component for admin users
          <Sidebar />
        ) : null}

        {/* Outlet for rendering nested routes */}
        <div style={{ width: "80%", padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
