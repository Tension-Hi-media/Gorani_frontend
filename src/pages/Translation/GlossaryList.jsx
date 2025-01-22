import React from "react";
import "../../assets/css/Translation/glossary.css";

function GlossaryList({
  glossaryList,
  defaultGlossary,
  editingGlossary,
  onChangeGlossaryName,
  onEditGlossaryName,
  onFinishEditGlossaryName,
  onSelectGlossary,
  onSetDefaultGlossary,
  onDeleteGlossary,
}) {
  return (
    <div className="glossary-list">
      {glossaryList.map((glossary, i) => (
        <div key={glossary._id || glossary.id || i} className="glossary-item">
          {editingGlossary === glossary._id ? ( // 현재 편집 중인 용어집인지 확인
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
            <span onClick={() => onSelectGlossary(glossary)}>
              {glossary.name}{" "}
              {defaultGlossary === glossary.name && <strong>(기본)</strong>}
            </span>
          )}
          <div className="glossary-buttons">
            {editingGlossary !== glossary._id && ( // 편집 중이 아닐 때만 표시
              <button
                className="glossary-edit-button"
                onClick={() => onEditGlossaryName(glossary)}
              >
                이름 편집
              </button>
            )}
            <button
              className="glossary-default-button"
              onClick={() => onSetDefaultGlossary(glossary.name)}
            >
              기본 설정
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
