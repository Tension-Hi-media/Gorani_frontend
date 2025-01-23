import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/User/myPage.css";
import MyPageModal from "./MyPageModal";
import {
  FaUser,
  FaBuilding,
  FaLanguage,
  FaLevelUpAlt,
  FaArrowLeft,
} from "react-icons/fa";

const MyPage = () => {
  const parsedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [user, setUser] = useState(parsedUserInfo);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  // 메뉴와 콘텐츠 상태 관리
  const [activeMenu, setActiveMenu] = useState("accountInfo");

  const handleBackClick = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleCompanyButtonClick = () => {
    setModalOpen(true); // 모달 열기
  };

  const handleModalClose = (updatedCompany) => {
    if (updatedCompany) {
      setUser((prevUser) => ({
        ...prevUser,
        company: updatedCompany,
      }));
    }
    setModalOpen(false); // 모달 닫기
  };

  const contentData = {
    accountInfo: (
      <div className="card">
        <h2>계정 정보</h2>
        <p>
          이메일: {user?.email}{" "}
          {user?.provider && (
            <img
              src={`${process.env.PUBLIC_URL}/images/${user.provider}.png`}
              alt={`${user.provider} Logo`}
              className="provider-logo"
            />
          )}
        </p>
        <p>이름: {user?.username}</p>
      </div>
    ),
    companyInfo: (
      <div className="card">
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
    ),
    languageInfo: (
      <div className="card">
        <h2>언어 설정</h2>
        <p>
          한국어{" "}
          <button className="change-button" onClick={() => alert("언어 변경")}>
            변경
          </button>
        </p>
      </div>
    ),
    upgradeInfo: (
      <div className="card">
        <h2>계정 업그레이드</h2>
        <p>Pro로 업그레이드하여 더욱 편리하게 번역할 수 있습니다.</p>
        <button className="compare-button">플랜 비교</button>
      </div>
    ),
  };

  if (!user) {
    return <div className="card">로딩 중...</div>;
  }

  return (
    <div className="my-page">
      {/* 왼쪽 메뉴 */}
      <div className="menu">
        <div
          className={`menu-item ${
            activeMenu === "accountInfo" ? "active" : ""
          }`}
          onClick={() => setActiveMenu("accountInfo")}
        >
          <FaUser style={{ marginRight: "10px" }} />
          계정 정보
        </div>
        <div
          className={`menu-item ${
            activeMenu === "companyInfo" ? "active" : ""
          }`}
          onClick={() => setActiveMenu("companyInfo")}
        >
          <FaBuilding style={{ marginRight: "10px" }} />
          기업 정보
        </div>
        <div
          className={`menu-item ${
            activeMenu === "languageInfo" ? "active" : ""
          }`}
          onClick={() => setActiveMenu("languageInfo")}
        >
          <FaLanguage style={{ marginRight: "10px" }} />
          언어 설정
        </div>
        <div
          className={`menu-item ${
            activeMenu === "upgradeInfo" ? "active" : ""
          }`}
          onClick={() => setActiveMenu("upgradeInfo")}
        >
          <FaLevelUpAlt style={{ marginRight: "10px" }} />
          계정 업그레이드
        </div>
        {/* 뒤로 가기 버튼 */}
        <button className="back-button" onClick={handleBackClick}>
          <FaArrowLeft style={{ marginRight: "8px" }} />
          뒤로 가기
        </button>
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className="content">{contentData[activeMenu]}</div>

      {/* 모달 */}
      {isModalOpen && (
        <MyPageModal company={user.company} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default MyPage;
