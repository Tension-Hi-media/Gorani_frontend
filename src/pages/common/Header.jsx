import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../assets/css/all.css";
import "./../../assets/css/Common/header.css";


const Header = ({ toggleModal }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 관리
  const [showAccountBox, setShowAccountBox] = useState(false); // 계정 박스 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  const toggleAccountBox = () => {
    setShowAccountBox((prev) => !prev); // 박스 보이기/숨기기 토글
  };

  const goToMyPage = () => {
    navigate("/myPage"); // 마이페이지로 이동
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그인 상태를 false로 변경
    alert("로그아웃되었습니다."); // 로그아웃 알림
    navigate("/"); // 로그아웃 후 메인 페이지로 이동
  };


  return (
    <header className="header">
      <div className="left-text">WWW.GORANIL.COM</div>
      <div className="title">GORANI</div>
      <div className="right-icons">
        {isLoggedIn ? (
          <div className="auth-buttons">
            <div className="account-button" onClick={toggleAccountBox}>
              GORANI
            </div>
            {showAccountBox && ( // 박스가 표시될 조건
              <div className="account-box">
                <div className="email">GORANI@gmail.com</div>
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