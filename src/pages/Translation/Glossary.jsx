import React, { useState } from "react";
import "../../assets/css/Translation/glossary.css";
import GlossaryModal from "./GlossaryModal";

function Glossary() {
  const [showGlossaryList, setShowGlossaryList] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [glossaryList, setGlossaryList] = useState(["용어집1", "용어집2"]);

  const toggleGlossaryList = () => setShowGlossaryList((prev) => !prev);

  const handleOpenModal = () => setIsGlossaryModalOpen(true);

  const handleCloseModal = () => setIsGlossaryModalOpen(false);

  const handleCreateGlossary = (name) => {
    setGlossaryList((prev) => [...prev, name]);
    alert(`새 용어집 "${name}"이(가) 생성되었습니다.`);
  };

  const handleDeleteGlossary = (name) => {
    if (window.confirm(`"${name}" 용어집을 삭제하시겠습니까?`)) {
      setGlossaryList((prev) => prev.filter((glossary) => glossary !== name));
    }
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
          {glossaryList.map((glossary, i) => (
            <div key={i} className="glossary-item">
              <span>{glossary}</span>
              <div className="glossary-buttons">
                <button className="glossary-edit-button">편집</button>
                <button
                  className="glossary-delete-button"
                  onClick={() => handleDeleteGlossary(glossary)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="create-glossary" onClick={handleOpenModal}>
        용어집 생성
      </button>

      {isGlossaryModalOpen && (
        <GlossaryModal
          isOpen={isGlossaryModalOpen}
          onClose={handleCloseModal}
          onCreate={handleCreateGlossary}
        />
      )}
    </div>
  );
}

export default Glossary;
