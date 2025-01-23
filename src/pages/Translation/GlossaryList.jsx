import React, { useState } from "react";
import "../../assets/css/Translation/glossary.css";

function GlossaryList({
  glossaryList,
  defaultGlossary,
  editingGlossary,
  onChangeGlossaryName,
  onBlurGlossaryName,
  onEditGlossaryName,
  onSelectGlossary,
  onSetDefaultGlossary, // 기본 설정 API 호출 핸들러
  onSetDefaultGlossaryAPI, // API 핸들러
  onDeleteGlossary,
  onFinishEditGlossaryName,
}) {
  const [loadingStates, setLoadingStates] = useState({}); // 각 용어집의 로딩 상태를 관리

  const handleSetDefaultGlossary = async (glossary) => {
    const glossaryId = glossary._id || glossary.id;

    // 로딩 상태 관리
    setLoadingStates((prev) => ({ ...prev, [glossaryId]: true }));

    try {
      // onSetDefaultGlossaryAPI를 호출하여 기본 용어집 설정을 처리
      await onSetDefaultGlossary(glossaryId);
      // 기본 용어집 설정 후 UI에 반영 (필요시 상태 업데이트 호출)
    } catch (error) {
      console.error("기본 용어집 설정 실패:", error);
      alert("기본 용어집 설정에 실패했습니다.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [glossaryId]: false }));
    }
  };

  return (
    <div className="glossary-list">
      {glossaryList.map((glossary, i) => (
        <div key={glossary._id || glossary.id || i} className="glossary-item" onClick={() => onSelectGlossary(glossary)}>
          {editingGlossary === glossary._id ? (
            <div className="editing-mode">
              <input
                type="text"
                value={glossary.name}
                onChange={(e) => onChangeGlossaryName(e, glossary)}
                autoFocus
              />
              <button
                className="glossary-save-button"
                onClick={() => onFinishEditGlossaryName(glossary)}
              >
                수정 완료
              </button>
            </div>
          ) : (
            <span>
              {glossary.name}{" "}
              {defaultGlossary === glossary.name && <strong>(기본)</strong>}
            </span>
          )}
          <div className="glossary-buttons">
            {editingGlossary !== glossary._id && (
              <button
                className="glossary-edit-button"
                onClick={() => onEditGlossaryName(glossary)}
              >
                이름 편집
              </button>
            )}
            <button
              className="glossary-default-button"
              onClick={() => handleSetDefaultGlossary(glossary)} // 버튼 클릭 시 기본 설정
              disabled={loadingStates[glossary._id || glossary.id]} // 로딩 상태에 따라 버튼 비활성화
            >
              {loadingStates[glossary._id || glossary.id]
                ? "설정 중..."
                : "기본 설정"}
            </button>
            <button
              className="glossary-delete-button"
              onClick={() => onDeleteGlossary(glossary._id || glossary.id)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GlossaryList;
