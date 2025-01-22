import React from "react";
import "../../assets/css/Translation/glossary.css";

function WordPairEditor({
  selectedGlossary,
  isSaving,
  onAddWordPair,
  onSaveWordPair,
  onUpdateWordPair,
  onDeleteWord,
  onChangeWordPair,
}) {
  // words가 undefined일 경우 빈 배열로 대체
  const words = selectedGlossary?.words ?? [];

  return (
    <div className="glossary-editor">
      {/* selectedGlossary.name이 undefined일 경우 기본 문자열 사용 */}
      <h3>{selectedGlossary?.name || "용어집"} 용어집</h3>
      <div className="word-list">
        {words.map((wordPair, index) => (
          <div key={index} className="word-pair">
            <input
              type="text"
              placeholder="출발 단어"
              value={wordPair.start}
              onChange={(e) => onChangeWordPair(index, "start", e.target.value)}
            />
            <span>→</span>
            <input
              type="text"
              placeholder="도착 단어"
              value={wordPair.arrival}
              onChange={(e) =>
                onChangeWordPair(index, "arrival", e.target.value)
              }
            />
            <div className="word-actions">
              {!wordPair._id ? (
                <button
                  onClick={() => onSaveWordPair(index)}
                  disabled={isSaving === index}
                >
                  {isSaving === index ? "저장 중..." : "저장"}
                </button>
              ) : (
                <button
                  onClick={() => onUpdateWordPair(index)}
                  disabled={isSaving === index}
                >
                  {isSaving === index ? "수정 중..." : "수정"}
                </button>
              )}
              <button onClick={() => onDeleteWord(index)}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      {words.length === 0 && (
        <div style={{ marginTop: "10px" }}>
          아직 단어쌍이 없습니다. "단어쌍 추가" 버튼을 눌러 새 단어쌍을
          만들어보세요!
        </div>
      )}
      <button onClick={onAddWordPair}>단어쌍 추가</button>
    </div>
  );
}

export default WordPairEditor;
