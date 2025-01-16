import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import "../../assets/css/User/myPage.css";

const MyPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleButtonClick = () => {
    navigate("/"); // 메인 페이지로 이동 (루트 경로)
  };

  return (
    <div className="my-page">
      <br></br>
      <h1 className="page-title">내 계정</h1>
      <br></br><br></br>
      <div className="section account-info">
        <h2>계정 정보</h2> 
        <p>이메일: GORANI@gmail.com (카카오, 네이버 등)</p>
        <p>이름: 고라니</p>
      </div>

      <div className="section company-info">
        <h2>기업 정보</h2>
        <p>
          기업명: 입력되지 않음
          <button className="change-button">변경</button>
        </p>
        <p>
          사업자 등록번호: 입력되지 않음
          <button className="attach-button">첨부</button>
        </p>
        <p>
          대표자명: 입력되지 않음
          <button className="change-button">변경</button>
        </p>
      </div>

      <div className="section language-info">
        <h2>언어</h2>
        <p>
          한국어
          <button className="change-button">변경</button>
        </p>
      </div>

      <div className="section upgrade-info">
        <h2>계정 업그레이드</h2>
        <p>Pro로 업그레이드하여 더욱 편리하게 번역할 수 있습니다.</p>
        <button className="compare-button">플랜 비교</button>
      </div>

      <button className="tab-button" onClick={handleButtonClick}>
        확인
      </button>
    </div>
  );
};

export default MyPage;
