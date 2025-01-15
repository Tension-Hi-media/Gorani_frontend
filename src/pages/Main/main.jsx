import React, { useState } from "react";
import "./../../assets/css/Translation/translation.css";

function Main() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("언어감지");
  const [targetLanguage, setTargetLanguage] = useState("영어");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTranslate = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText, targetLanguage }),
      });
      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleSourceDropdown = () => {
    setShowSourceDropdown((prev) => !prev);
  };

  const toggleTargetDropdown = () => {
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

  return (
    <>
      <div className="translation-container">
        {/* Header */}
        <header className="header">
          <div className="left-text">WWW.GORANIL.COM</div>
          <div className="title">GORANI</div>
          <div className="right-icons">
            <button className="login" onClick={toggleModal}>
              로그인
            </button>
            <img src="/images/icon.jpg" alt="Icon 1" />
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <div className="translation-box">
            {/* Source Language Selection */}
            <div className="before-translation">
              <div className="data-source-language">
                <div className="data-source-language-button">
                  <span>{sourceLanguage}</span>
                </div>
                <button
                  className="dropdown-toggle-button"
                  onClick={toggleSourceDropdown}
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
                    className="dropdown-icon"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {showSourceDropdown && (
                  <ul className="language-dropdown">
                    {["한국어", "영어", "일본어"].map(
                      (lang) => (
                        <li
                          key={lang}
                          className="language-option"
                          onClick={() => selectSourceLanguage(lang)}
                        >
                          {lang}
                        </li>
                      )
                    )}
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

            {/* Target Language Selection */}
            <div className="translation-result">
              <div className="data-source-language">
                <div className="data-source-language-button">
                  <span>{targetLanguage}</span>
                </div>
                <button
                  className="dropdown-toggle-button"
                  onClick={toggleTargetDropdown}
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
                    className="dropdown-icon"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {showTargetDropdown && (
                  <ul className="language-dropdown">
                    {["한국어", "영어", "일본어"].map((lang) => (
                      <li
                        key={lang}
                        className="language-option"
                        onClick={() => selectTargetLanguage(lang)}
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

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()} // 부모 클릭 이벤트 차단
            >
              <h2>로그인</h2>
              <button className="login-button google">Google 계정으로 로그인</button>
              <button className="login-button kakao">Kakao 계정으로 로그인</button>
              <button className="login-button naver">Naver 계정으로 로그인</button>
              <button className="close-button" onClick={toggleModal}>
                닫기
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>ⓒ WWW.GORANIL.COM</p>
      </footer>
    </>
  );
}

export default Main;