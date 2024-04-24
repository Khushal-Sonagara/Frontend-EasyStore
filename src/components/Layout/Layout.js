import { Navigate, Outlet } from "react-router-dom";
import SidebarComponent from "../Sidebar/SidebarComponent";
import "./Layout.css";

function Layout() {
  const auth=localStorage.getItem('user');
  return (
    <>
    {auth?
      <div className="layout-container">
        <div className="sidebar-container">
          <SidebarComponent />
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
      :<Navigate to="/login" />
}
    </>
  );
}

export default Layout;
