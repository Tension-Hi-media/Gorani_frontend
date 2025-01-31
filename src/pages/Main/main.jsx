import React, { useState, useEffect } from "react";
import "../../assets/css/all.css";
import "../../assets/css/Main/main.css";
import "../../assets/css/Translation/translation.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Modal from "../Common/Modal";
import Glossary from "../Translation/Glossary";
import { getTranslationResult } from "../../Apis/TranslateAPI";

function Main() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("한국어");
  const [targetLanguage, setTargetLanguage] = useState("영어");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("GORANI");
  const [userInfo, setUserInfo] = useState(null); // ★ userInfo 상태 추가

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      const parsed = JSON.parse(stored);
      setNickname(parsed.username || "GORANI");
      setIsLoggedIn(true);
      setUserInfo(parsed); // ★ userInfo 세팅
    }
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      setNickname(parsedUserInfo.username || "GORANI");
      setIsLoggedIn(true);
    }
  }, []);

  const handleTranslate = async () => {
    // 선택된 언어를 매핑 테이블에서 코드로 변환
    const sourceCode = languageCodeMap[sourceLanguage];
    const targetCode = languageCodeMap[targetLanguage];

    try {
      const response = await getTranslationResult(
        inputText,
        sourceCode,
        targetCode
      );
      setTranslatedText(response);
    } catch (error) {
      console.error("번역 요청 중 오류 발생:", error);
      alert("번역 요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const toggleGlossary = () => {
    console.log("Glossary button clicked!"); // 클릭 확인 로그 추가
    setShowGlossary((prev) => !prev);
  };

  const toggleSourceDropdown = (e) => {
    e.stopPropagation();
    setShowSourceDropdown((prev) => !prev);
  };

  const toggleTargetDropdown = (e) => {
    e.stopPropagation();
    setShowTargetDropdown((prev) => !prev);
  };

  const selectSourceLanguage = (language) => {
    setSourceLanguage(language);
    setShowSourceDropdown(false);
  };

  const selectTargetLanguage = (language) => {
    setTargetLanguage(language);
    setShowTargetDropdown(false);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleLogin = () => {
    localStorage.setItem("userInfo", JSON.stringify({ username: "GORANI" }));
    setNickname("GORANI");
    setIsLoggedIn(true);
    setIsModalOpen(false); // 로그인 모달 닫기
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setNickname("GORANI"); // 기본 닉네임으로 초기화
    alert("로그아웃되었습니다.");
  };

  const reverseLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText); // 입력창 내용을 번역 결과로 변경
    setTranslatedText(inputText); // 번역 결과를 입력창 내용으로 변경
  };

  const languageCodeMap = {
    한국어: "ko",
    영어: "en",
    일본어: "ja",
  };

  return (
    <div className="translation-container">
      <Header
        isLoggedIn={isLoggedIn}
        nickname={nickname} // Header에 nickname 전달
        toggleModal={toggleModal}
        handleLogout={handleLogout}
      />
      <main className="main-content">
        <div className="translation-box">
          <div className="before-translation">
            <div className="data-source-language">
              <div className="left-items">
                <div
                  className="data-source-language-button"
                  onClick={(e) => toggleSourceDropdown(e)}
                >
                  <span>{sourceLanguage}</span>
                </div>
                <button
                  className="dropdown-toggle-button"
                  onClick={(e) => toggleSourceDropdown(e)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`dropdown-icon ${
                      showSourceDropdown ? "clicked" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
              <div className="right-items">
                <img
                  src="../../../images/revers.jpg"
                  alt="Reverse Icon"
                  className="reverse-icon"
                  onClick={reverseLanguages} // 리버스 기능 추가
                />
              </div>
              {showSourceDropdown && (
                <ul className="language-dropdown">
                  {["한국어", "영어", "일본어"].map((lang) => (
                    <li
                      key={lang}
                      className={`language-option ${
                        lang === targetLanguage ? "disabled" : ""
                      }`}
                      onClick={() =>
                        lang !== targetLanguage && selectSourceLanguage(lang)
                      }
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="번역할 내용을 입력하세요"
            />
            <button className="translation-button" onClick={handleTranslate}>
              번역하기
            </button>
          </div>
          <div className="translation-result">
            <div className="data-source-language">
              <div className="left-items">
                <div
                  className="data-source-language-button"
                  onClick={(e) => toggleTargetDropdown(e)}
                >
                  <span>{targetLanguage}</span>
                </div>
                <button
                  className="dropdown-toggle-button"
                  onClick={(e) => toggleTargetDropdown(e)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`dropdown-icon ${
                      showTargetDropdown ? "clicked" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
              <div className="right-items">
                <button
                  className="glossary-button"
                  onClick={
                    isLoggedIn
                      ? toggleGlossary
                      : () => alert("로그인 후 이용 가능합니다.")
                  }
                >
                  용어집
                </button>
                {showGlossary && isLoggedIn && userInfo && (
                  <Glossary userInfo={userInfo} />
                )}{" "}
                {/* 로그인 상태에서만 Glossary 표시 */}
              </div>
              {showTargetDropdown && (
                <ul className="language-dropdown">
                  {["한국어", "영어", "일본어"].map((lang) => (
                    <li
                      key={lang}
                      className={`language-option ${
                        lang === sourceLanguage ? "disabled" : ""
                      }`}
                      onClick={() =>
                        lang !== sourceLanguage && selectTargetLanguage(lang)
                      }
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="translation-output">{translatedText}</div>
          </div>
        </div>
      </main>
      <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
        <button onClick={handleLogin}>로그인 완료</button>
      </Modal>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <Footer />
    </div>
  );
}

export default Main;
