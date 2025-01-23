import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/User/myPage.css";
import MyPageModal from "./MyPageModal";

const MyPage = () => {
  const parsedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [user, setUser] = useState(parsedUserInfo);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    navigate("/");
  };

  const handleCompanyButtonClick = () => {
    setModalOpen(true); // 모달 열기
  };

  const handleModalClose = (updatedCompany) => {
    if (updatedCompany) {
      // 업데이트된 기업 정보로 사용자 정보 갱신
      setUser((prevUser) => ({
        ...prevUser,
        company: updatedCompany,
      }));
    }
    setModalOpen(false); // 모달 닫기
  };

  const getProviderLogo = (provider) => {
    switch (provider) {
      case "kakao":
        return (
          <img
            src={`${process.env.PUBLIC_URL}/images/kakao.jpg`}
            alt="Kakao Logo"
            className="provider-logo"
          />
        );
      case "naver":
        return (
          <img
            src={`${process.env.PUBLIC_URL}/images/naver.png`}
            alt="Naver Logo"
            className="provider-logo"
          />
        );
      case "google":
        return (
          <img
            src={`${process.env.PUBLIC_URL}/images/google.png`}
            alt="Google Logo"
            className="provider-logo"
          />
        );
      default:
        return null;
    }
  };

  if (!user) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="my-page">
      <br />
      <h1 className="page-title">내 계정</h1>
      <br />
      <br />
      <div className="section account-info">
        <h2>계정 정보</h2>
        <p>
          이메일: {user?.email} {getProviderLogo(user?.provider)}
        </p>
        <p>이름: {user?.username}</p>
      </div>

      <div className="section company-info">
        <h2>기업 정보</h2>
        <p>기업명: {user.company ? user.company.name : "입력되지 않음"}</p>
        <p>
          사업자 등록번호:{" "}
          {user.company ? user.company.registrationNumber : "입력되지 않음"}
        </p>
        <p>
          대표자명:{" "}
          {user.company ? user.company.representativeName : "입력되지 않음"}
        </p>
        <button className="company-button" onClick={handleCompanyButtonClick}>
          {user.company ? "변경" : "입력"}
        </button>
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

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <MyPageModal
          company={user.company}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default MyPage;
