import React, { useState } from "react";

function Main() {
  const [inputText, setInputText] = useState(""); // 사용자 입력
  const [translatedText, setTranslatedText] = useState(""); // 번역 결과

  const handleTranslate = async () => {
    try {
      // Spring Boot 백엔드로 번역 요청
      const response = await fetch("http://localhost:8080/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      setTranslatedText(data.translatedText); // 번역 결과 표시
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>React-Spring Boot-FastAPI Translation</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <button onClick={handleTranslate}>Translate</button>
      <h2>Translated Text:</h2>
      <p>{translatedText}</p>
    </div>
  );
}

export default Main;
