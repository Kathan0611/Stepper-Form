import React from "react";
import "./Header.css";
import frameImg from "./../../assets/Frame_12.png";
import notificationImg from "./../../assets/Notification.png";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Step Goal Form</h1>
      <div className="profile">
        <span>
          <img src={notificationImg} />
        </span>
        <div className="avatar-header">
          <img src={frameImg} />
        </div>
      </div>
    </header>
  );
};

export default Header;
