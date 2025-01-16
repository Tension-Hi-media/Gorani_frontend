import React from "react";
import "./../../assets/css/all.css";
import "./../../assets/css/Common/header.css";

const Header = ({ toggleModal, handleLogout }) => {
  const isLoggedIn = false; // 로그인된 상태로 가정

  return (
    <header className="header">
      <div className="left-text">WWW.GORANIL.COM</div>
      <div className="title">GORANI</div>
      <div className="right-icons">
        {isLoggedIn ? (
          <div className="auth-buttons">
            <div className="account-button">계정</div>
            <div className="logout-button" onClick={handleLogout}>
              로그아웃
            </div>
          </div>
        ) : (
          <div className="login" onClick={toggleModal}>
            로그인
          </div>
        )}
        <img src="/images/icon.jpg" alt="Icon" />
      </div>
    </header>
  );
};

export default Header;
