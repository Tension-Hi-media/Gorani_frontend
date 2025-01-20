import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/Translation/glossaryModal.css";

function GlossaryModal({ isOpen, onClose, onCreate }) {
  const [glossaryName, setGlossaryName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (glossaryName.trim() === "") {
      alert("용어집 이름을 입력해주세요.");
      return;
    }
    onCreate(glossaryName);
    setGlossaryName("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      {/* 바깥 클릭 시 닫히지 않도록 onClick 제거 */}
      <div className="modal-content">
        <button className="cancel-button" onClick={onClose}>
          X
        </button>
        <h2>새 용어집 생성</h2>
        <input
          type="text"
          className="glossary-input"
          placeholder="용어집 이름을 입력하세요"
          value={glossaryName}
          onChange={(e) => setGlossaryName(e.target.value)}
          ref={inputRef}
        />
        <div className="modal-buttons">
          <button className="create-button" onClick={handleCreate}>
            생성
          </button>
        </div>
      </div>
    </div>
  );
}

export default GlossaryModal;
