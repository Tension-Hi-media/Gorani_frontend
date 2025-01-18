import React, { useState } from "react";
import "../../assets/css/Translation/glossary.css";

function Glossary() {
  const [showGlossaryList, setShowGlossaryList] = useState(false);
  const [startText, setStartText] = useState("");
  const [arrivalText, setArrivalText] = useState("");

  const toggleGlossaryList = () => {
    setShowGlossaryList((prev) => !prev);
  };

  return (
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
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="glossary-item">
              <span>용어집{i + 1}</span>
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
                  >
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
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
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
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
          className="button add-button"
          disabled={!startText || !arrivalText}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </button>

        <button className="button delete-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Glossary;
