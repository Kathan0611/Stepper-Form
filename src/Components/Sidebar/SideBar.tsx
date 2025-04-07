import React from "react";
import "./Sidebar.css";
import { FaHome, FaUser, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import frameImg from "../../assets/Frame_12.png";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/goalcard");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <div className="menu-item" onClick={() => {}}>
          <FaHome className="menu-icon" />
          <span>Home</span>
        </div>
        <div className="menu-item" onClick={() => {}}>
          <FaUser className="menu-icon" />
          <span>Users</span>
        </div>
        <div className="menu-item active" onClick={handleNavigation}>
          <FaClipboardList className="menu-icon" />
          <span>Goals</span>
        </div>
        <div className="menu-item" onClick={() => {}}>
          <FaSignOutAlt className="menu-icon" />
          <span>Log Out</span>
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="user-info">
          <div>
            <img src={frameImg} className="avatar-icon" />
          </div>
          <div className="user-details">
            <p className="user-name">John Anderson</p>
            <p className="user-email">john@yopmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
