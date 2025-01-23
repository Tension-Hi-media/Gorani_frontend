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
  onSetDefaultGlossary,
  onSetDefaultGlossaryAPI,
  onDeleteGlossary,
  onFinishEditGlossaryName,
}) {
  const [loadingStates, setLoadingStates] = useState({});

  const handleSetDefaultGlossary = async (glossary) => {
    const glossaryId = glossary._id || glossary.id;
    setLoadingStates((prev) => ({ ...prev, [glossaryId]: true }));

    try {
      await onSetDefaultGlossary(glossaryId);
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
        <div
          key={glossary._id || glossary.id || i}
          className="glossary-item"
          onClick={() => onSelectGlossary(glossary)}
        >
          {editingGlossary === glossary._id ? (
            <div className="editing-mode">
              <input
                type="text"
                value={glossary.name}
                onChange={(e) => onChangeGlossaryName(e, glossary)}
                autoFocus
              />
              <button
                className="button button--learn-more glossary-save-button"
                onClick={() => onFinishEditGlossaryName(glossary)}
              >
                완료
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
                className="button button--learn-more glossary-edit-button"
                onClick={() => onEditGlossaryName(glossary)}
              >
                편집
              </button>
            )}
            <button
              className="button button--learn-more glossary-default-button"
              onClick={() => handleSetDefaultGlossary(glossary)}
            >
              기본
            </button>
            <button
              className="button button--learn-more button--secondary glossary-delete-button"
              onClick={() => onDeleteGlossary(glossary._id || glossary.id)}
              aria-label={`${glossary.name} 삭제`}
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
