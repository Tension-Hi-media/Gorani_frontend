import React from "react";
import "./../../assets/css/all.css";
import "./../../assets/css/Common/header.css";

const Header = ({ toggleModal }) => {
  return (
    <header className="header">
      <div className="left-text">WWW.GORANIL.COM</div>
      <div className="title">GORANI</div>
      <div className="right-icons">
        <div className="login" onClick={toggleModal}>
          로그인
        </div>
        <img src="/images/icon.jpg" alt="Icon" />
      </div>
    </header>
  );
};

export default Header;
