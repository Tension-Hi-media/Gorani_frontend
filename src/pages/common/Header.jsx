import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../assets/css/all.css";
import "./../../assets/css/Common/Header.css";

const Header = ({ toggleModal, isLoggedIn, nickname, handleLogout }) => {
  const [showAccountBox, setShowAccountBox] = useState(false); // 계정 박스 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  const toggleAccountBox = () => {
    setShowAccountBox((prev) => !prev); // 계정 박스 열기/닫기
  };

  const goToMyPage = () => {
    navigate("/myPage"); // 마이페이지로 이동
  };

  return (
    <header className="header">
      <div className="left-text">WWW.GORANI.COM</div>
      <div className="title">GORANI</div>
      <div className="right-icons">
        {isLoggedIn ? (
          <div className="auth-buttons">
            <div
              className="account-button"
              onClick={toggleAccountBox}
              role="button"
            >
              {nickname}
            </div>
            {showAccountBox && (
              <div className="account-box">
                <div className="email">{nickname}</div>
                <div className="version">
                  <span>번역기</span>
                  <span>무료버전</span>
                </div>
                <button className="myPage" onClick={goToMyPage}>
                  계정
                </button>
                <button className="logOut" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="login" onClick={toggleModal} role="button">
            로그인
          </div>
        )}
        <img className="header-icon" src="/images/icon.jpg" alt="Icon" />
      </div>
    </header>
  );
};

export default Header;
