import React from "react";
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
  onDeleteGlossary,
}) {
  return (
    <div className="glossary-list">
      {glossaryList.map((glossary, i) => (
        <div key={glossary._id || glossary.id || i} className="glossary-item">
          {editingGlossary === glossary.name ? (
            <input
              type="text"
              value={glossary.name}
              onChange={(e) => onChangeGlossaryName(e, glossary)}
              onBlur={onBlurGlossaryName}
              autoFocus
            />
          ) : (
            <span onClick={() => onSelectGlossary(glossary)}>
              {glossary.name}{" "}
              {defaultGlossary === glossary.name && <strong>(기본)</strong>}
            </span>
          )}
          <div className="glossary-buttons">
            <button
              className="glossary-edit-button"
              onClick={() => onEditGlossaryName(glossary)}
            >
              이름 편집
            </button>
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
