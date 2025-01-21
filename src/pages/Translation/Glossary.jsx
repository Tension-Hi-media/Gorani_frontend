import React, { useState, useEffect } from "react";
import "../../assets/css/Translation/glossary.css";
import GlossaryModal from "./GlossaryModal";
import {
  createGlossary,
  fetchAllGlossaries,
  addWordPair,
  deleteGlossary,
  deleteWordPair,
  updateWordPair,
} from "../../Apis/TranslateAPI";

function Glossary({ userInfo }) {
  const [showGlossaryList, setShowGlossaryList] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [glossaryList, setGlossaryList] = useState([]);
  const [defaultGlossary, setDefaultGlossary] = useState(null);
  const [selectedGlossary, setSelectedGlossary] = useState({ words: [] });
  const [editingGlossary, setEditingGlossary] = useState(null);
  const [isGlossaryEnabled, setIsGlossaryEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(null); // 저장 중인 단어쌍의 인덱스
  // 변경감지(저장 필요 여부) flag
  const [isDirty, setIsDirty] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // 리프레시 트리거

  useEffect(() => {
    async function loadGlossaries() {
      try {
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

  useEffect(() => {
    if (glossaryList.length > 0) {
      const firstGlossary = glossaryList[0];
      const safeFirstGlossary = {
        ...firstGlossary,
        words: firstGlossary.words || [],
      };
      setDefaultGlossary(safeFirstGlossary.name || "기본 용어집");
      setSelectedGlossary(safeFirstGlossary);
    } else {
      console.log("Glossary list is empty."); // 용어집 리스트가 비어 있는 경우
      setDefaultGlossary(null);
      setSelectedGlossary({ words: [] });
    }
  }, [glossaryList, refreshKey]);

  const toggleGlossaryList = () => setShowGlossaryList((prev) => !prev);

  const handleOpenModal = () => setIsGlossaryModalOpen(true);
  const handleCloseModal = () => setIsGlossaryModalOpen(false);

  const handleCreateGlossary = async (name) => {
    const newGlossary = { name, words: [], userId: userInfo.id };
    try {
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

  const handleDeleteGlossary = async (id) => {
    if (window.confirm("이 용어집을 삭제하시겠습니까?")) {
      try {
        const result = await deleteGlossary(id);
        setGlossaryList((prev) => prev.filter((item) => item.id !== id));
        alert("용어집이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("용어집 삭제 실패:", error);
        alert("용어집 삭제에 실패했습니다.");
      }
    }
  };

  const handleSelectGlossary = (glossary) => {
    if (!glossary.id) {
      alert("해당 용어집에는 ID가 없습니다.");
      return;
    }
    setSelectedGlossary(glossary);
    setIsDirty(false); // 새로 고른 용어집일 때는 저장할 내용이 없으므로 false
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
    if (!selectedGlossary || !selectedGlossary.id) {
      alert("용어집을 선택해주세요.");
      return;
    }

    const updatedGlossary = {
      ...selectedGlossary,
      words: [...selectedGlossary.words, { start: "", arrival: "" }], // 빈 단어쌍 추가
    };

    setSelectedGlossary(updatedGlossary);
    setGlossaryList((prev) =>
      prev.map((glossary) =>
        glossary.id === selectedGlossary.id ? updatedGlossary : glossary
      )
    );
  };

  // 저장 후 refreshKey 업데이트
  const handleSaveWordPair = async (index) => {
    const newWordPair = selectedGlossary.words[index];

    if (!newWordPair.start || !newWordPair.arrival) {
      alert("출발 단어와 도착 단어를 모두 입력해주세요.");
      return;
    }

    setIsSaving(index);

    try {
      await addWordPair(selectedGlossary.id, newWordPair);

      // refreshKey 업데이트
      setRefreshKey((prev) => prev + 1);

      alert("단어쌍이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("단어쌍 저장 실패:", error);
      alert("단어쌍 저장에 실패했습니다.");
    } finally {
      setIsSaving(null);
    }
  };

  const handleUpdateWordPair = async (index) => {
    const updatedWordPair = selectedGlossary.words[index];

    console.log("Updating word pair:", updatedWordPair);

    if (!updatedWordPair.start || !updatedWordPair.arrival) {
      alert("출발 단어와 도착 단어를 모두 입력해주세요.");
      console.error(
        "Validation failed: Both start and arrival must be provided."
      );
      return;
    }

    try {
      // 단일 단어쌍 업데이트를 위한 API 호출
      const response = await updateWordPair(
        selectedGlossary.id, // glossaryId
        updatedWordPair._id, // wordPairId
        {
          ...updatedWordPair,
          userId: userInfo.id, // 로그인한 유저의 ID 추가
        }
      );

      console.log("Word pair updated successfully:", response);

      // 상태 업데이트 (API에서 전체 데이터를 반환하지 않는다면 로컬에서 업데이트)
      setGlossaryList((prev) =>
        prev.map((glossary) =>
          glossary.id === selectedGlossary.id
            ? {
                ...glossary,
                words: glossary.words.map((word, idx) =>
                  idx === index ? updatedWordPair : word
                ),
              }
            : glossary
        )
      );

      alert("단어쌍 수정이 완료되었습니다.");
    } catch (error) {
      console.error("Word pair update failed:", error);
      alert("단어쌍 수정에 실패했습니다.");
    }
  };

  const handleDeleteWord = async (index) => {
    if (!selectedGlossary || !selectedGlossary.id) {
      alert("용어집을 선택해주세요.");
      return;
    }

    if (window.confirm("이 단어쌍을 삭제하시겠습니까?")) {
      try {
        await deleteWordPair(selectedGlossary.id, index);

        // 삭제 후 UI 업데이트
        const updatedWords = selectedGlossary.words.filter(
          (_, i) => i !== index
        );
        const updatedGlossary = { ...selectedGlossary, words: updatedWords };
        setSelectedGlossary(updatedGlossary);
        setGlossaryList((prev) =>
          prev.map((glossary) =>
            glossary.id === selectedGlossary.id ? updatedGlossary : glossary
          )
        );
        alert("단어쌍이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("단어쌍 삭제 실패:", error);
        alert("단어쌍 삭제에 실패했습니다.");
      }
    }
  };

  const handleChangeWordPair = (index, field, value) => {
    const updatedWords = [...selectedGlossary.words];
    updatedWords[index][field] = value;

    const updatedGlossary = { ...selectedGlossary, words: updatedWords };
    setSelectedGlossary(updatedGlossary);
    setGlossaryList((prev) =>
      prev.map((glossary) =>
        glossary.id === selectedGlossary.id ? updatedGlossary : glossary
      )
    );
    setIsDirty(true); // 변경 상태 감지
  };

  return (
    <div className="glossary-box">
      <label style={{ display: "block", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={isGlossaryEnabled}
          onChange={() => {
            setIsGlossaryEnabled((prev) => !prev);
          }}
        />
        {isGlossaryEnabled ? " 용어집 활성화" : " 용어집 비활성화"}
      </label>
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
                  onClick={() => handleDeleteGlossary(glossary.id)}
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
          <h3>{selectedGlossary.name} 용어집</h3>
          <div className="word-list">
            {selectedGlossary?.words.map((wordPair, index) => (
              <div key={index} className="word-pair">
                <input
                  type="text"
                  placeholder="출발 단어"
                  value={wordPair.start}
                  onChange={(e) =>
                    handleChangeWordPair(index, "start", e.target.value)
                  }
                />
                <span>→</span>
                <input
                  type="text"
                  placeholder="도착 단어"
                  value={wordPair.arrival}
                  onChange={(e) =>
                    handleChangeWordPair(index, "arrival", e.target.value)
                  }
                />
                <div className="word-actions">
                  {!wordPair._id ? (
                    <button
                      onClick={() => handleSaveWordPair(index)}
                      disabled={isSaving === index} // 저장 중이면 버튼 비활성화
                    >
                      {isSaving === index ? "저장 중..." : "저장"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateWordPair(index)}
                      disabled={isSaving === index} // 저장 중이면 버튼 비활성화
                    >
                      {isSaving === index ? "수정 중..." : "수정"}
                    </button>
                  )}
                  <button onClick={() => handleDeleteWord(index)}>삭제</button>
                </div>
              </div>
            ))}
          </div>

          {selectedGlossary?.words?.length === 0 && (
            <div style={{ marginTop: "10px" }}>
              아직 단어쌍이 없습니다. "단어쌍 추가" 버튼을 눌러 새 단어쌍을
              만들어보세요!
            </div>
          )}
          <button onClick={handleAddWordPair}>단어쌍 추가</button>
        </div>
      )}
    </div>
  );
}

export default Glossary;
