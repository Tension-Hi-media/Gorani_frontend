import React from "react";
import "../../assets/css/all.css";
import "../../assets/css/Common/Modal.css";
import GoogleLoginComponent from "../Login/GoogleLogin";
import NaverLogin from "../Login/Naver"; // NaverLogin 컴포넌트 import
import KakaoLogin from "../Login/KakaoLogin"; // KakaoLogin 컴포넌트 import

const Modal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 아무것도 렌더링하지 않음

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-button"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            toggleModal();
          }}
        >
          X
        </button>
        <h2>로그인</h2>

        <button className="login-button google">
          <img className="logo" src="../../../images/google.png" alt="Google" />
          Google 계정으로 로그인
        </button>

        <button className="login-button kakao">
          <img className="logo" src="../../../images/kakao.jpg" alt="Kakao" />
          Kakao 계정으로 로그인
        </button>

        <button className="login-button naver">
          <img className="logo" src="../../../images/naver.png" alt="Naver" />
          Naver 계정으로 로그인
        </button>
      </div>
    </div>
  );
};

export default Modal;
