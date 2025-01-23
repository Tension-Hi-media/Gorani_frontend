import React, { useState, useEffect } from "react";
import "../../assets/css/Translation/glossary.css";
import GlossaryModal from "./GlossaryModal";
import { createGlossary, fetchAllGlossaries } from "../../Apis/TranslateAPI";

function Glossary({ userInfo }) {
  const [showGlossaryList, setShowGlossaryList] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [glossaryList, setGlossaryList] = useState([]); // 초기 데이터 제거
  const [defaultGlossary, setDefaultGlossary] = useState(null);
  const [selectedGlossary, setSelectedGlossary] = useState({ words: [] });
  const [editingGlossary, setEditingGlossary] = useState(null); // 현재 편집 중인 용어집 이름

  // 기본 용어집 초기화
  useEffect(() => {
    async function loadGlossaries() {
      try {
        // userInfo.id를 통해 유저 ID를 넘김
        const glossaries = await fetchAllGlossaries(userInfo.id);
        setGlossaryList(glossaries);
      } catch (err) {
        console.error("용어집 로드 실패:", err);
      }
    }

    if (userInfo && userInfo.id) {
      loadGlossaries();
    }
  }, [userInfo]);
  // 2) glossaryList가 바뀔 때 defaultGlossary / selectedGlossary 기본값 설정
  useEffect(() => {
    if (glossaryList.length > 0) {
      const firstGlossary = glossaryList[0];
      // words가 없으면 빈 배열로
      const safeFirstGlossary = {
        ...firstGlossary,
        words: firstGlossary.words || [],
      };
      setDefaultGlossary(safeFirstGlossary.name);
      setSelectedGlossary(safeFirstGlossary);
    }
  }, [glossaryList]);

  const toggleGlossaryList = () => setShowGlossaryList((prev) => !prev);

  const handleOpenModal = () => setIsGlossaryModalOpen(true);

  const handleCloseModal = () => setIsGlossaryModalOpen(false);

  const handleCreateGlossary = async (name) => {
    const newGlossary = { name, words: [], userId: userInfo.id };
    console.log("들어간 용어집: ",newGlossary)
    try {
      // createGlossary 함수가 직접 return한 값이 서버 응답 그 자체
      const savedGlossary = await createGlossary(newGlossary);

      setGlossaryList((prev) => [...prev, savedGlossary]);
      setSelectedGlossary(savedGlossary);
      setIsGlossaryModalOpen(false);
      alert(`새 용어집 "${name}"이(가) 성공적으로 생성되었습니다.`);
    } catch (error) {
      console.error("용어집 생성 및 저장 실패:", error);
      alert("용어집 생성 및 저장 실패");
    }
  };

  const handleDeleteGlossary = (name) => {
    if (window.confirm(`"${name}" 용어집을 삭제하시겠습니까?`)) {
      setGlossaryList((prev) =>
        prev.filter((glossary) => glossary.name !== name)
      );

      if (defaultGlossary === name) {
        const remainingGlossaries = glossaryList.filter(
          (glossary) => glossary.name !== name
        );
        setDefaultGlossary(
          remainingGlossaries.length > 0 ? remainingGlossaries[0].name : null
        );
      }

      if (selectedGlossary?.name === name) {
        setSelectedGlossary(null);
      }
    }
  };

  const handleSelectGlossary = (glossary) => {
    setSelectedGlossary(glossary);
  };

  const handleSetDefaultGlossary = (name) => {
    setDefaultGlossary(name);
    alert(`"${name}"이(가) 기본 용어집으로 설정되었습니다.`);
  };

  const handleEditGlossaryName = (glossary) => {
    setEditingGlossary(glossary.name);
  };

  const handleChangeGlossaryName = (event, glossary) => {
    const newName = event.target.value.trim();
    if (!newName) {
      alert("용어집 이름은 비어 있을 수 없습니다.");
      return;
    }
    if (glossaryList.some((item) => item.name === newName)) {
      alert("중복된 이름은 허용되지 않습니다.");
      return;
    }

    setGlossaryList((prev) =>
      prev.map((item) =>
        item.name === glossary.name ? { ...item, name: newName } : item
      )
    );
    if (defaultGlossary === glossary.name) {
      setDefaultGlossary(newName);
    }
    if (selectedGlossary?.name === glossary.name) {
      setSelectedGlossary({ ...selectedGlossary, name: newName });
    }
  };

  const handleBlurGlossaryName = () => {
    setEditingGlossary(null);
  };

  const handleAddWordPair = () => {
    if (!selectedGlossary || !Array.isArray(selectedGlossary.words)) {
      alert("선택된 용어집이 없습니다.");
      return;
    }
    if (selectedGlossary.words.length >= 30) {
      alert("최대 30개의 단어쌍만 추가할 수 있습니다.");
      return;
    }
    const updatedGlossary = {
      ...selectedGlossary,
      words: [...selectedGlossary.words, { start: "", arrival: "" }],
    };
    setSelectedGlossary(updatedGlossary);
    setGlossaryList((prev) =>
      prev.map((glossary) =>
        glossary.name === selectedGlossary.name ? updatedGlossary : glossary
      )
    );
  };

  const handleUpdateWord = (index, field, value) => {
    const updatedWords = [...selectedGlossary.words];
    updatedWords[index][field] = value;
    const updatedGlossary = { ...selectedGlossary, words: updatedWords };
    setSelectedGlossary(updatedGlossary);
    setGlossaryList((prev) =>
      prev.map((glossary) =>
        glossary.name === selectedGlossary.name ? updatedGlossary : glossary
      )
    );
  };

  const handleDeleteWord = (index) => {
    const updatedWords = selectedGlossary.words.filter((_, i) => i !== index);
    const updatedGlossary = { ...selectedGlossary, words: updatedWords };
    setSelectedGlossary(updatedGlossary);
    setGlossaryList((prev) =>
      prev.map((glossary) =>
        glossary.name === selectedGlossary.name ? updatedGlossary : glossary
      )
    );
  };

  return (
    <div className="glossary-box">
      <h2>용어집</h2>
      <div
        className={`glossary-category ${showGlossaryList ? "expanded" : ""}`}
        onClick={toggleGlossaryList}
      >
        용어집 리스트
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
              {editingGlossary === glossary.name ? (
                <input
                  type="text"
                  value={glossary.name}
                  onChange={(e) => handleChangeGlossaryName(e, glossary)}
                  onBlur={handleBlurGlossaryName}
                  autoFocus
                />
              ) : (
                <span onClick={() => handleSelectGlossary(glossary)}>
                  {glossary.name}{" "}
                  {defaultGlossary === glossary.name && <strong>(기본)</strong>}
                </span>
              )}
              <div className="glossary-buttons">
                <button
                  className="glossary-edit-button"
                  onClick={() => handleEditGlossaryName(glossary)}
                >
                  이름 편집
                </button>
                <button
                  className="glossary-default-button"
                  onClick={() => handleSetDefaultGlossary(glossary.name)}
                >
                  기본 설정
                </button>
                <button
                  className="glossary-delete-button"
                  onClick={() => handleDeleteGlossary(glossary.name)}
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

      {selectedGlossary && (
        <div className="glossary-editor">
          {selectedGlossary && <h3>{selectedGlossary.name} 편집</h3>}
          <div className="word-list">
            {selectedGlossary?.words?.length === 0 && (
              <div className="word-pair empty">
                <input type="text" placeholder="출발 단어" disabled />
                <span>→</span>
                <input type="text" placeholder="도착 단어" disabled />
                <div className="word-actions">
                  <button disabled>수정</button>
                  <button disabled>삭제</button>
                </div>
              </div>
            )}
            {selectedGlossary?.words?.map((wordPair, index) => (
              <div key={index} className="word-pair">
                <input
                  type="text"
                  placeholder="출발 단어"
                  value={wordPair.start}
                  onChange={(e) =>
                    handleUpdateWord(index, "start", e.target.value)
                  }
                />
                <span>→</span>
                <input
                  type="text"
                  placeholder="도착 단어"
                  value={wordPair.arrival}
                  onChange={(e) =>
                    handleUpdateWord(index, "arrival", e.target.value)
                  }
                />
                <div className="word-actions">
                  <button onClick={() => handleUpdateWord(index)}>수정</button>
                  <button onClick={() => handleDeleteWord(index)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleAddWordPair}>단어쌍 추가</button>
        </div>
      )}
    </div>
  );
}

export default Glossary;
