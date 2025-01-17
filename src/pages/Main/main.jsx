import React, { useState } from "react";
import "../../assets/css/all.css";
import "../../assets/css/Main/main.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Modal from "../Common/Modal";
import Glossary from "./../Translation/Glossary"; // Glossary 컴포넌트
import { getTranslationResult } from "../../Apis/TranslateAPI";

function Main() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showGlossaryList, setShowGlossaryList] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("한국어");
  const [targetLanguage, setTargetLanguage] = useState("영어");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState("true");
  const [startText, setStartText] = useState("");
  const [arrivalText, setArrivalText] = useState("");

  const handleTranslate = async () => {
    const response = await getTranslationResult(
      inputText,
      sourceLanguage,
      targetLanguage
    );
    setTranslatedText(response);

    // try {
    //   const response = await fetch("http://localhost:8080/api/translate", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ text: inputText, targetLanguage }),
    //   });
    //   const data = await response.json();
    //   setTranslatedText(data.translatedText);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
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
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  console.log("isLoggedIn:", isLoggedIn); // 로그인 상태 확인
  console.log("showGlossary:", showGlossary); // 용어집 표시 상태 확인

  return (
    <div className="translation-container">
      <Header
        isLoggedIn={isLoggedIn}
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
                />
              </div>
              {showSourceDropdown && (
                <ul className="language-dropdown">
                  {["한국어", "영어", "일본어"].map((lang) => (
                    <li
                      key={lang}
                      className="language-option"
                      onClick={() => selectSourceLanguage(lang)}
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
                <button className="glossary-button" onClick={toggleGlossary}>
                  용어집
                </button>
                {showGlossary && isLoggedIn && <Glossary />}{" "}
                {/* 로그인 상태에서만 Glossary 표시 */}
              </div>
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
      <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
        <button onClick={handleLogin}>로그인 완료</button>
      </Modal>
      <Footer />
    </div>
  );
}

export default Main;
