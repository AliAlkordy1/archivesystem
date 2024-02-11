import React from "react";
import TopBar from "./component/topbar";
import UserSidebar from "./component/UserSideBar";
import Sidebar from "./component/sidebar";
import WardaSideBar from "./component/wardaSideBar";
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
        {userRole === "صادرة" ? (
          // Render the UserSidebar component for صادرة users
          <UserSidebar />
        ) : userRole === "admin" ? (
          // Render the Sidebar component for admin users
          <Sidebar />
        ) : userRole === "واردة" ? (
          // Render the Sidebar component for admin users
          <WardaSideBar /> ): null }

        {/* Outlet for rendering nested routes */}
        <div style={{ width: "80%", padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
