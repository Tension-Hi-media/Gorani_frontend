import React from "react";
import "../../assets/css/Translation/glossary.css";
import GlossaryModal from "./GlossaryModal";
import GlossaryList from "./GlossaryList";
import WordPairEditor from "./WordPairEditor";
import useGlossaryManager from "../../hooks/useGlossaryManager";

function Glossary({ userInfo = {} }) {
  const {
    // 상태
    showGlossaryList,
    isGlossaryModalOpen,
    glossaryList,
    defaultGlossary,
    selectedGlossary,
    editingGlossary,
    isGlossaryEnabled,
    isSaving,
    isDirty,
    isLoading,

    // setter
    setIsGlossaryEnabled,

    // GlossaryList 핸들러
    toggleGlossaryList,
    handleOpenModal,
    handleCloseModal,
    handleCreateGlossary,
    handleDeleteGlossary,
    handleSelectGlossary,
    handleSetDefaultGlossary,
    handleEditGlossaryName,
    handleChangeGlossaryName,
    handleBlurGlossaryName,
    handleFinishEditGlossaryName, // 추가된 핸들러

    // WordPairEditor 핸들러
    handleAddWordPair,
    handleSaveWordPair,
    handleUpdateWordPair,
    handleDeleteWord,
    handleChangeWordPair,
  } = useGlossaryManager(userInfo);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="glossary-box">
      <label style={{ display: "block", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={isGlossaryEnabled}
          onChange={() => setIsGlossaryEnabled((prev) => !prev)}
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
        <GlossaryList
          glossaryList={glossaryList}
          defaultGlossary={defaultGlossary}
          editingGlossary={editingGlossary}
          onChangeGlossaryName={handleChangeGlossaryName}
          onBlurGlossaryName={handleBlurGlossaryName}
          onEditGlossaryName={handleEditGlossaryName}
          onSelectGlossary={handleSelectGlossary}
          onSetDefaultGlossary={handleSetDefaultGlossary}
          onDeleteGlossary={handleDeleteGlossary}
          onFinishEditGlossaryName={handleFinishEditGlossaryName} // 핸들러 전달
        />
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

      {/* selectedGlossary와 words가 존재할 때만 WordPairEditor 렌더링 */}
      {selectedGlossary && Array.isArray(selectedGlossary.words) && (
        <WordPairEditor
          selectedGlossary={selectedGlossary}
          isSaving={isSaving}
          onAddWordPair={handleAddWordPair}
          onSaveWordPair={handleSaveWordPair}
          onUpdateWordPair={handleUpdateWordPair}
          onDeleteWord={handleDeleteWord}
          onChangeWordPair={handleChangeWordPair}
        />
      )}
    </div>
  );
}

export default Glossary;
