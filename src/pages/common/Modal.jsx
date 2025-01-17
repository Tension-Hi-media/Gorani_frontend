import React from "react";
import "../../assets/css/all.css";
import "../../assets/css/Common/modal.css";
import GoogleLoginComponent from "./google_login";
import NaverLogin from "./naver"; // NaverLogin 컴포넌트 import

const Modal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 아무것도 렌더링하지 않음

  return (
    <div className="modal-overlay" onClick={toggleModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // 부모 클릭 이벤트 차단
      >
        <h2>로그인</h2>
        <GoogleLoginComponent />
        <button className="login-button kakao">Kakao 계정으로 로그인</button>
        <NaverLogin /> {/* 네이버 로그인 컴포넌트 렌더링 */}
        <button
          className="close-button"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            toggleModal(); // 모달 닫기
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
