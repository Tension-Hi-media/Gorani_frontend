import React, { useState } from "react";
import "../../assets/css/all.css";
import "../../assets/css/Main/main.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Modal from "../Common/Modal";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startText, setStartText] = useState("");
  const [arrivalText, setArrivalText] = useState("");


  const handleTranslate = async () => {

    const response = await getTranslationResult(inputText,sourceLanguage,targetLanguage);
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
    setShowGlossary((prev) => !prev);
  };

  const toggleGlossaryList = () => {
    setShowGlossaryList((prev) => !prev);
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
                    className={`dropdown-icon ${showSourceDropdown ? "clicked" : ""
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
                    className={`dropdown-icon ${showTargetDropdown ? "clicked" : ""
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
                {showGlossary && (
                  <div className="glossary-box">
                    <h2>용어집</h2>
                    <div
                      className={`glossary-category ${showGlossaryList ? "expanded" : ""}`}
                      onClick={toggleGlossaryList}
                    >
                      기본용어집
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`dropdown-icon ${showGlossaryList ? "rotated" : ""}`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>


                    {showGlossaryList && (
                      <div className="glossary-list">
                        <div className="glossary-item">
                          <span>기본용어집</span>
                          <div className="glossary-buttons">
                            <button className="glossary-edit-button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-edit-2"
                              >
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                              </svg>
                            </button>
                            <button className="glossary-delete-button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-trash-2"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </div>


                        <div className="glossary-item">
                          <span>용어집1</span>
                          <div className="glossary-buttons">
                            <button className="glossary-edit-button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-edit-2"
                              >
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                              </svg>
                            </button>
                            <button className="glossary-delete-button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-trash-2"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </div>


                        <div className="glossary-item">
                          <span>용어집2</span>
                          <div className="glossary-buttons">
                            <button className="glossary-edit-button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-edit-2"
                              >
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                              </svg>
                            </button>
                            <button className="glossary-delete-button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-trash-2"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </div>


                        <div className="glossary-item">
                          <span>용어집3</span>
                          <div className="glossary-buttons">
                            <button className="glossary-edit-button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-edit-2"
                              >
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                              </svg>
                            </button>
                            <button className="glossary-delete-button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-trash-2"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <button className="creat-glossary">용어집 생성</button>
                    <div className="save-word">
                      <textarea
                        className="start-text"
                        placeholder="출발 텍스트"
                        value={startText}
                        onChange={(e) => setStartText(e.target.value)}
                      ></textarea>
                      <span className="arrow">→</span>
                      <textarea
                        className="arrive-text"
                        placeholder="도착 텍스트"
                        value={arrivalText}
                        onChange={(e) => setArrivalText(e.target.value)}
                      ></textarea>
                      <button
                        className="add-term-button"
                        disabled={!startText || !arrivalText}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="check-icon"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="word-list">
                      <div className="word-item">
                        <div className="word-item-language">
                          <span className="start-language">한국어</span>
                          <span className="arrow">→</span>
                          <span className="arrive-language">영어</span>
                        </div>
                        <div className="word-item-content">
                          <textarea className="start-word">영양</textarea>
                          <span className="arrow">→</span>
                          <textarea className="arrive-word">Yeongyang(Gyeongsangbuk-do, South Korea)</textarea>
                          <button className="word-edit-button">
                            <svg xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-edit-2">
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>
                          </button>
                          <button className="word-delete-button">
                            <svg xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-trash-2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="word-item">
                        <div className="word-item-language">
                          <span className="start-language">한국어</span>
                          <span className="arrow">→</span>
                          <span className="arrive-language">영어</span>
                        </div>
                        <div className="word-item-content">
                          <textarea className="start-word">대구</textarea>
                          <span className="arrow">→</span>
                          <textarea className="arrive-word">Daegu(Gyeongsangbuk-do, South Korea)</textarea>
                          <button className="word-edit-button">
                            <svg xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-edit-2">
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>
                          </button>
                          <button className="word-delete-button">
                            <svg xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-trash-2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="word-item">
                        <div className="word-item-language">
                          <span className="start-language">한국어</span>
                          <span className="arrow">→</span>
                          <span className="arrive-language">일본어</span>
                        </div>
                        <div className="word-item-content">
                          <textarea className="start-word">고양</textarea>
                          <span className="arrow">→</span>
                          <textarea className="arrive-word">コヤン (京畿道、韓国)</textarea>
                          <button className="word-edit-button">
                            <svg xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-edit-2">
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>
                          </button>
                          <button className="word-delete-button">
                            <svg xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-trash-2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                )}
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
